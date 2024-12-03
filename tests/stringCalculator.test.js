const add = require('../src/stringCalculator');

test('should return 0 for an empty string', () => {
  expect(add('')).toBe(0);
});

test('should return the number itself for a single number', () => {
  expect(add('1')).toBe(1);
});

test('should return the sum of two numbers', () => {
  expect(add('1,2')).toBe(3);
});

test('should return the sum of any amount of numbers', () => {
  expect(add('1,2,3')).toBe(6);
});
