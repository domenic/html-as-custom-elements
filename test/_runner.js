'use strict';

var TEST_REGEXP = /^\/base\/test\/[^_].*\.js$/i;

var allTestFiles = Object.keys(window.__karma__.files)
  .filter(function (file) { return TEST_REGEXP.test(file); })
  .map(pathToModule);

requirejs.config({
  baseUrl: '/base',
  deps: allTestFiles,
  callback: window.__karma__.start
});

function pathToModule(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
}
