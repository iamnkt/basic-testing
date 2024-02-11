import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const linkedList = generateLinkedList(['a', 'b', 'c']);

  test('should generate linked list from values 1', () => {
    expect(linkedList).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 'c',
        },
        value: 'b',
      },
      value: 'a',
    });
  });

  test('should generate linked list from values 2', () => {
    expect(linkedList).toMatchSnapshot();
  });
});
