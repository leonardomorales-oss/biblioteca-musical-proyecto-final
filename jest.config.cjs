module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  moduleFileExtensions: ['js', 'jsx'],

  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
  ],

  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
    },
  },
};