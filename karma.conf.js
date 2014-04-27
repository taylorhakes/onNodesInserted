// Karma configuration
// Generated on Sat Apr 26 2014 18:31:41 GMT-0400 (EDT)
var customLaunchers = {
	sl_chrome: {
		base: 'SauceLabs',
		browserName: 'chrome'
	},
	sl_firefox: {
		base: 'SauceLabs',
		browserName: 'firefox'
	},
	iphone_4: {
		base: 'SauceLabs',
		platform: 'OS X 10.6',
		browserName: 'iphone',
		version: '4'
	},
	sl_opera: {
		base: 'SauceLabs',
		browserName: 'opera'
	},
	sl_ie_9: {
		base: 'SauceLabs',
		browserName: 'internet explorer',
		platform: 'Windows 7',
		version: '9'
	}
};
module.exports = function (config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',

		// frameworks to use
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'onNodesInserted.js', 'test/*.spec.js', 'test/fixtures/*.html'
		],

		preprocessors: {
			'**/*.html': ['html2js']
		},

		// list of files to exclude
		exclude: [

		],
		/*customLaunchers: customLaunchers,*/

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'/*, 'saucelabs'*/],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		browsers: ['PhantomJS']/*Object.keys(customLaunchers)*/,

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
