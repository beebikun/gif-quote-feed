import axios from 'axios';
import { _TEST_QUOTE_RESPONSE, BASE_URL as QUOTE_URL } from 'api/Andruxnet';
import { _TEST_GIF_RESPONSE, BASE_URL as GIF_URL } from 'api/Giphy';
import { _TEST_BACKEND_RESPONSE, _TEST_BACKEND_LIST_RESPONSE, BASE_URL as BACKEND_URL } from 'api/Backend';


const mockedGet = jest.fn((url: string) => {
  const response = url.startsWith(QUOTE_URL)   ? _TEST_QUOTE_RESPONSE        :
                   url.startsWith(GIF_URL)     ? _TEST_GIF_RESPONSE          :
                   url.startsWith(BACKEND_URL) ? _TEST_BACKEND_LIST_RESPONSE :
                   undefined;

  return Promise.resolve(response);
});

const mockedPost = jest.fn((url: string) => {
  return Promise.resolve(_TEST_BACKEND_RESPONSE);
});

const mockedPut = jest.fn((url: string) => {
  return Promise.resolve(_TEST_BACKEND_RESPONSE);
});

const mockedDelete = jest.fn(() => {
  return Promise.resolve(_TEST_BACKEND_RESPONSE);
});

export default {
  get: mockedGet,
  post: mockedPost,
  put: mockedPut,
  delete: mockedDelete,

  spread: axios.spread,
  all: axios.all,
};