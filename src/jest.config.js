module.exports = {
  roots: ['<rootDir>/src'],
  transform: { '^.+\\.jsx?$': 'js-jest' },
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
