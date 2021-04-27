module.exports = function(config) {
	"use strict";
	const puppeteer = require('puppeteer');
	process.env.CHROME_BIN = puppeteer.executablePath();
	config.set({
	reporters: ['progress', 'junit', 'html'],
        htmlReporter: {
                        outputFile: 'tests/units.html',

      // Optional
                        pageTitle: 'Unit Tests',
                        subPageTitle: 'A sample project description',
                        groupSuites: true,
                        useCompactStyle: true,
                        useLegacyStyle: true,
                        showOnlyFailed: false
        },
        junitReporter: {
                outputDir: '', // results will be saved as $outputDir/$browserName.xml
                outputFile: '',
                suite: '', // suite will become the package name attribute in xml testsuite element
                useBrowserName: true, // add browser name to report and classes names
                nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
                classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
                properties: {}, // key value pair of properties to add to the <properties> section of the report
                xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    },
        frameworks: ["ui5","qunit","sinon"],
		ui5: {
		  url: "https://sapui5.hana.ondemand.com",
		  mode: "script",
		  config: {
			async: true,
			resourceRoots: {
			  "com.yash.opa5.OPA": "./base/webapp"
			}
		  },
		  tests: [
			"com/yash/opa5/OPA/test/integration/AllJourneys"
			//"com/yash/ptg/employee_dashboard/Assignment5/test/unit/AllTests"
			//"com/yash/ptg/employee_dashboard/Assignment5/test/testsuite.qunit"
		  ]
		},
		preprocessors: {
			"{webapp,webapp/!(test)}/!(mock*).js": ["coverage"]
		},
		coverageReporter: {
			includeAllSources: true,
			reporters: [
				{
					type: "html",
					dir: "coverage"
				},
				{
					type: "text"
				}
			],
			check: {
				each: {
					statements: 0,
					branches: 0,
					functions: 0,
					lines: 0
				}
			}
		},
		reporters: ["progress", "coverage"],

//  browsers: ["Chrome"],
	browsers: ['ChromeHeadlessCI'],
		customLaunchers: {
			ChromeHeadlessCI: {
				base: 'ChromeHeadless',
					flags: ['--no-sandbox','--disable-setuid-sandbox',]
			}
		},
        browserConsoleLogOptions: {
			level: "error"
        },

		singleRun: true
	});
};
