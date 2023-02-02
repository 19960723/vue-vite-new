import { add } from '../src/utils';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2).toBe(3));
});

test('adds -1 + 2 to equal 1', () => {
  expect(add(1, 2).toBe(1));
});

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3).toBe(5));
});
