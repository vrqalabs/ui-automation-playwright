// Environment configuration for different deployment stages.
// Each environment defines a base URL, the name of the test data
// file to load from `tests/fixtures`, and which application binary
// or identifier should be launched during tests.

module.exports = {
  stage: {
    baseUrl: 'https://rahulshettyacademy.com/seleniumPractise/#/',
    testDataFile: 'stageData.json'
  },
  dev: {
    baseUrl: 'https://rahulshettyacademy.com/seleniumPractise/#/dev',
    testDataFile: 'devData.json'
  }
};
