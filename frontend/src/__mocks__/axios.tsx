import axios from 'axios';

import { BASE_URL as BACKEND_URL } from 'api/Backend';
import {
  getResponse as getBackendResponse,
  getListReponse as getBackendListResponse
} from 'utils/testUtils/data/backend';

import { BASE_URL as QUOTE_URL } from 'api/Andruxnet';
import {
  getResponse as getQuotesResponse,
} from 'utils/testUtils/data/quotes';

import { BASE_URL as GIF_URL } from 'api/Giphy';
import {
  getResponse as getGifResponse,
} from 'utils/testUtils/data/gif';


function responseFactory(url: string) {
  if (url.startsWith(QUOTE_URL)) {
    return getQuotesResponse();
  }
  if (url.startsWith(GIF_URL)) {
    return getGifResponse();
  }
  if (url.startsWith(BACKEND_URL)) {
    return getBackendListResponse();
  }

  return;
}


const mockedGet = jest.fn((url: string) => {
  const response = responseFactory(url);

  return Promise.resolve(response);
});

const mockedPost = jest.fn((url: string) => {
  return Promise.resolve(getBackendResponse());
});

const mockedPut = jest.fn((url: string) => {
  return Promise.resolve(getBackendResponse());
});

const mockedDelete = jest.fn(() => {
  return Promise.resolve(getBackendResponse());
});

export default {
  all: axios.all,
  delete: mockedDelete,
  get: mockedGet,
  post: mockedPost,
  put: mockedPut,
  spread: axios.spread,
};