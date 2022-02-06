module.exports = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  bail: 1,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/config/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './.babelrc' }],
  },
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '\\.(scss|css|less)$': 'identity-obj-proxy',
    '\\.(png|svg|pdf|jpg|jpeg)$': '<rootDir>/config/.jest/fileMock.ts',
  }
};
