const {
  validUrl,
  generateId,
} = require('./helpers');

describe('validUrl', () => {
  const testCases = [
    { url: 'http://google.com', expectedResult: true },
    { url: 'https://google.com', expectedResult: true },
    { url: 'http://www.google.com', expectedResult: true },
    { url: 'https://www.google.com', expectedResult: true },
    { url: 'www.google.com', expectedResult: true },
    { url: 'google.com', expectedResult: true },
    { url: 'google', expectedResult: false },
    { url: 'www....google.com', expectedResult: false },
    { url: undefined, expectedResult: false },
  ];

  testCases.map(({ url, expectedResult }) => {
    test(`returns ${expectedResult} for ${url}`, () => {
      expect(validUrl(url)).toBe(expectedResult);
    });
  });

  test('returns false for an empty string', () => {
    expect(validUrl('')).toBe(false);
  });
});

describe('generateId', () => {
  test('it returns an 8 digit string of alphanumeric characters', () => {
    const id = generateId();

    expect(id.length).toBe(8);
    expect(id).toEqual(expect.stringMatching(/\w+/));
  });

  test('generates a new value at each execution', () => {
    const id0 = generateId();
    const id1 = generateId();

    expect(id0).not.toBe(id1);
  });
});
