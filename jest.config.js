module.exports = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
