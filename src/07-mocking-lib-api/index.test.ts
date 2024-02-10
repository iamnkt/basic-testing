import axios from 'axios';
// import { throttledGetDataFromApi } from './index';
// import { throttle } from 'lodash';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockImplementation(() => Promise.resolve({}));

mockedAxios.create = jest.fn(() => mockedAxios);

describe('throttledGetDataFromApi', () => {
  jest.mock('lodash/throttle', () => ({
    default: jest.fn((fn) => fn),
    __esModule: true,
  }));

  test('should create instance with provided base url', async () => {
    // const spyOnCreate = jest.spyOn(mockedAxios, 'create');
    // jest.spyOn(mockedAxios, 'get').mockImplementation(() => Promise.resolve({}));
    // await throttledGetDataFromApi('/path');
    // expect(spyOnCreate).toBeCalled();
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
