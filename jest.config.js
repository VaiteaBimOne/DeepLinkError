module.exports = async () => {
  return {
    collectCoverage: true,
    reporters: ['default', 'jest-junit'],
    coverageReporters: ['text', 'cobertura'],
    coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/assetsTransformer.js',
    },
    preset: 'react-native',
    rootDir: '.',
    setupFilesAfterEnv: ['<rootDir>/jestSetup.js'],
    testEnvironment: 'jsdom',
    testResultsProcessor: 'jest-sonar-reporter',
    testSequencer: '<rootDir>/testSequencer.js',
    testTimeout: 50000,
    transformIgnorePatterns: [
      'node_modules/(?!(' +
        '@react-native' +
        '|@react-native-masked-view/(.*)' +
        '|react-native' +
        '|@react-native-community/(.*)' +
        '|react-native-(.*))/)',
    ],
  };
};
