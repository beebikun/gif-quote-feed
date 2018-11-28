const COLLECTION_NAME = '_TEST_API';
const secrets = require('../src/util/secrets');
secrets.COLLECTION_NAME = COLLECTION_NAME;
jest.mock('../src/util/logger');

import Types from 'Types';
import { Response, Request } from 'express';

import Item, { serializeList } from '../src/models/Item';
import * as apiController from '../src/controllers/api';
import {
  loadFixtures, dropCollection
  closeConnection, waitConnection,
  getItems,
} from './utils';

const spyers = Object.keys(apiController)
  .reduce((bucket: { [name: string]: any }, name: string) => {
    bucket[name] = jest.spyOn(apiController, name);
    return bucket;
  }, {});
const { DATA, makeApiRequest } = require('./utils/request');

beforeAll(() => {
  return waitConnection();
});

afterAll(() => {
  return dropCollection(COLLECTION_NAME)
    .then(() => closeConnection());
});

beforeEach(() => {
  Object.keys(spyers)
    .forEach(name => {
      spyers[name].mockClear();
    });
});

const BASE_URL = process.env.API_ROUTE_PREFIX + 'items/';

const table = [
  ['list', 'get', 'find'],
  ['detail', 'get', 'findById'],
  ['create', 'post'],
  ['update', 'put'],
  ['remove', 'delete', 'findByIdAndRemove'],
];

describe.each(table)('Api test', testItem);


function testItem(apiMethod: string, httpMethod: string,
                  collectionMethodToMock? : string): void {

  it(`${ apiMethod } : Error: 500`, () => {
    return getItems().then((SAVED_DATA) => {
      expect(SAVED_DATA)
        .not.toHaveLength(0);


      let replacedCollectionsMethod;
      if (collectionMethodToMock !== undefined) {
        replacedCollectionsMethod = jest.spyOn(Item, collectionMethodToMock);
        replacedCollectionsMethod.mockImplementationOnce(() => {
          return Promise.reject();
        });
      }

      return makeRequest([ '', SAVED_DATA[0].id ], 500, ({ body }: Response): void => {
        replacedCollectionsMethod && replacedCollectionsMethod.mockRestore();
        if (collectionMethodToMock === undefined) {
          expect(body).toMatchObject({
            _message: 'Validation failed',
          });
        } else {
          expect(body).toEqual({});
        }
      });
    });
  });

  it(`${ apiMethod } : Error: 404`, () => {
    return getItems().then(() => {
      return makeRequest([ 'wrong_url', '0'.repeat(24) ], 404, ({ body }: Response): void => {
        expect(body).toEqual({});
      });
    });
  });

  it(`${ apiMethod } : Success`, () => {
    return getItems().then((SAVED_DATA) => {
      expect(SAVED_DATA)
        .not.toHaveLength(0);
      const itemId = SAVED_DATA[0].id;

      return makeRequest([ '', itemId ], null, ({ body }: Response): void => {
        if (apiMethod === 'list') {
          expect(body).toEqual(SAVED_DATA);
        } else {
          const createdItem = expect.objectContaining({
            ...DATA,
            id: expect.any(String),
          });
          const updatedItem = expect.objectContaining({
            ...DATA,
            id: itemId,
          });
          const expected = {
            delete: {},
            get: SAVED_DATA[0],
            post: createdItem,
            put: updatedItem,
          };
          expect(body).toEqual(expected[httpMethod]);
        }

      });
    });
  });

  function expectRequest(itemId: string, d: object): void {
    expect(spyers[apiMethod]).toHaveBeenCalledTimes(1);

    if (apiMethod === 'list') return;

    const request: Request = spyers[apiMethod].mock.calls[0][0];
    if (httpMethod !== 'post') {
      expect(request.params)
        .toEqual({ itemId });
    }

    if (httpMethod !== 'get' && httpMethod !== 'delete') {
      expect(request.body)
        .toEqual(d);
    }
  }

  function makeRequest([prefix, itemId]: [string, string], errorCode?: number,
                       expectResponse: () => void): Promise<void> {
    const usePrefix = apiMethod === 'list' || httpMethod === 'post';
    const URL = BASE_URL + (usePrefix ? prefix : itemId);
    const [r, d] = makeApiRequest(URL, httpMethod, errorCode);
    return r.expect((response: Response) => {
      if (!usePrefix || errorCode !== 404) {
        expectRequest(itemId, d);
      }
      expectResponse(response);
    });
  }
}
