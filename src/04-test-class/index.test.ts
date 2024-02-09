import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 20;
  const amount = 30;
  const transferAmount = 10;

  const account = getBankAccount(initialBalance);
  const otherAccount = getBankAccount(initialBalance);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(amount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      account.transfer(amount, otherAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(transferAmount, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(amount);

    expect(account.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const balance = account.getBalance();
    account.withdraw(amount);

    expect(account.getBalance()).toBe(balance - amount);
  });

  test('should transfer money', () => {
    const balance = account.getBalance();
    const otherAccountBalance = otherAccount.getBalance();
    account.transfer(transferAmount, otherAccount);

    expect(account.getBalance()).toBe(balance - transferAmount);
    expect(otherAccount.getBalance()).toBe(
      otherAccountBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balanceMock = 50;
    const requestMock = 1;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(balanceMock)
      .mockReturnValueOnce(requestMock);
    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balanceMock = 50;
    const requestMock = 1;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(balanceMock)
      .mockReturnValueOnce(requestMock);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balanceMock);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balanceMock = 50;
    const requestMock = 0;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(balanceMock)
      .mockReturnValueOnce(requestMock);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
