import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const callback = jest.fn();
  const timeout = 3000;

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const callback = jest.fn();
  const interval = 3000;

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval * 5);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = './test.txt';
  const fileContents = 'aaa\r\nbbb\r\n';

  jest.mock('path');
  jest.mock('fs');
  jest.mock('fs/promises');

  test('should call join with pathToFile', async () => {
    const spyOnJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(spyOnJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValueOnce(fileContents);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContents);
  });
});
