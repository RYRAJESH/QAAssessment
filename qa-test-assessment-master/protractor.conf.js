// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { Config, browser } = require('protractor');
var reporter = require('cucumber-html-reporter');

exports.config = {
  debug: false,
  allScriptsTimeout: 11000,
  specs: [
    './e2e/features/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  allScriptsTimeout: 45000,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: 'node_modules/protractor-cucumber-framework',
  cucumberOpts: {
    strict: true,
    require: [
      './e2e/**/*.steps.ts'
    ],
    format: [
      'json:test-reports/cucumber-test-results.json'
    ]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './e2e/tsconfig.e2e.json')
    });
  },
  onComplete: () => {
    var options = {
      theme: 'bootstrap',
      jsonFile: 'test-reports/cucumber-test-results.json',
      output: 'test-reports/reports/cucumber_report.html',
      screenshotsDirectory: 'test-reports/screenshots/',
      storeScreenshots: true,
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: true,
      metadata: {
        "App Version": "0.3.2",
        "Test Environment": "Test",
        "Browser": "Chrome  92.0.4103.61",
        "Platform": "Windows 10",
        "Executed": "Remote"
      }
    };
    reporter.generate(options);
  }
};
