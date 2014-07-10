module.exports = function(config) {
  config.set({
    basePath: '',
    // karma is sensitive to order of plugins.
    // Particularly, requirejs must go before chai
    frameworks: ['traceur', 'requirejs', 'mocha', 'chai'],

    files: [
      'test/_runner.js',
      'src/styles/html.css',
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'test/**/*.js', included: false}
    ],

    preprocessors: {
      'src/**/*.js': ['traceur'],
      'test/**/!(_runner).js': ['traceur']
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // only do Canary, since other browsers require various polyfills
    browsers: ['ChromeCanary'],
    singleRun: false,

    traceurPreprocessor: {
      options: {
        sourceMap: false,
        // compile traceur modules to amd, consumed by requirejs
        modules: 'amd'
      }
    }
  });
};
