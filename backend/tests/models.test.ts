const COLLECTION_NAME = '_TEST_MODELS';
const secrets = require('../src/util/secrets');
secrets.COLLECTION_NAME = COLLECTION_NAME;

import Types from 'Types';
import { ValidationError } from "mongoose/lib/error";
import Item, { serializeList } from "../src/models/Item";
import {
  dropCollection, closeConnection, waitConnection,
} from "./utils";


beforeAll(() => {
  return waitConnection();
});

afterAll(() => {
  return dropCollection(COLLECTION_NAME)
    .then(() => closeConnection());
});

const DATA = Object.freeze({ text: 'text', gif: { src: 'src', width: 100, height: 100 } });

interface ICreateResponse {
  err: Types.MaybyError;
  item: Types.MaybyItem;
  oldCount: number;
  newCount: number;
};
type ICreatePartial = Partial<ICreateResponse>;

function createItem(data = DATA): Promise<ICreatePartial> {
  return new Promise(resolve => {
    return Item.create(data, (err: Types.MaybyError, item: Types.MaybyItem) => {
      resolve({ err, item });
    });
  });
}

function getCount(): Promise<number> {
  return Item.count({}, (err: Types.MaybyError, count: number) => {
    return count;
  });
}

describe('create', () => {
  function getCreationData(data = DATA): Promise<ICreateResponse> {
    return getCount()
      .then((oldCount: number) => {
        return createItem(data).then((response: ICreatePartial) => ({
          ...response, oldCount,
        }));
      })
      .then((response: ICreatePartial) => {
        return getCount().then((newCount: number) => ({
          ...response, newCount
        }));
      });
  }

  it('success', (done) => {
    return getCreationData()
      .then(({ err, item, oldCount, newCount }: ICreateResponse) => {
        expect(err).toBeFalsy();
        expect(item).toBeInstanceOf(Item);
        expect(newCount).toBe(oldCount + 1);

        done();
      });
  });

  it('error', (done) => {
    return getCreationData({...DATA, text: undefined})
      .then(({ err, item, oldCount, newCount }: ICreateResponse) => {
        expect(err).toBeInstanceOf(ValidationError);
        expect(item).toEqual([]);
        expect(newCount).toBe(oldCount);

        done();
      });
  });
});


describe('serialize', () => {
  function getExpected(item: Types.ItemModel): Types.IItem {
    return { ...DATA, id: item._id.toString() };
  }

  it('item', (done) => {
    return createItem()
      .then(({ item }: ICreateResponse) => {
        const serialized: Types.IItem = item.serialize();
        const expected: Types.IItem = getExpected(item);
        expect(serialized)
          .toEqual(expected);
        done();
      });
  });

  it('list', (done) => {
    return createItem()
      .then(({ item }: ICreateResponse) => {
        const serialized: Types.IItem[] = serializeList([item]);
        const expected: Types.IItem = [ getExpected(item) ];
        expect(serialized)
          .toEqual(expected);
        done();
      });
  });
});


