import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    mockedAxios.create.mockImplementationOnce(() => mockedAxios);
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: 'data' }),
    );
    await throttledGetDataFromApi('path');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.create.mockImplementationOnce(() => mockedAxios);
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: 'data' }),
    );
    await throttledGetDataFromApi('path');

    expect(mockedAxios.get).toHaveBeenCalledWith('path');
  });

  test('should return response data', async () => {
    mockedAxios.create.mockImplementationOnce(() => mockedAxios);
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: 'data' }),
    );

    const response = await throttledGetDataFromApi('path');

    expect(response).toBe('data');
  });
});
