import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 6;
  const b = 2;

  test('should add two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Add })).toBe(8);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Subtract })).toBe(4);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toBe(36);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a, b, action: 'Invalid action' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 6, b: '2', action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: true, b: 2, action: Action.Add })).toBe(null);
  });
});
