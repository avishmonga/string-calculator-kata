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

test('should return the sum of numbers with newlines as delimiters', () => {
  expect(add('1\n2,3')).toBe(6);
});

describe('add method with custom delimiters', () => {
  test('should return the sum with default delimiter', () => {
    expect(add('1,2')).toBe(3);
  });

  test('should return the sum with custom delimiter ";"', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  test('should return the sum with custom delimiter "|"', () => {
    expect(add('//|\n1|2|3')).toBe(6);
  });
});

describe('add method with negative numbers', () => {
  test('should throw an error for a single negative number', () => {
    expect(() => add('1,-2,3')).toThrow('negative numbers not allowed: -2');
  });

  test('should throw an error for multiple negative numbers', () => {
    expect(() => add('-1,-2,3')).toThrow(
      'negative numbers not allowed: -1, -2'
    );
  });
});

describe('add method with numbers greater than 1000', () => {
  test('should ignore numbers greater than 1000', () => {
    expect(add('2,1001')).toBe(2);
  });

  test('should include numbers less than or equal to 1000', () => {
    expect(add('2,1000')).toBe(1002);
  });

  test('should handle mixed cases with custom delimiters', () => {
    expect(add('//;\n2;1001;3')).toBe(5);
  });

  test('should handle only numbers greater than 1000', () => {
    expect(add('1001,1002')).toBe(0);
  });
});

describe('add method with custom delimiters of any length', () => {
  test('should handle custom delimiter of any length', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
  });

  test('should handle custom delimiter with special characters', () => {
    expect(add('//[###]\n4###5###6')).toBe(15);
  });

  test('should throw error for negative numbers with custom delimiter', () => {
    expect(() => add('//[---]\n1---2----3')).toThrow(
      'negative numbers not allowed: -3'
    );
  });
});
