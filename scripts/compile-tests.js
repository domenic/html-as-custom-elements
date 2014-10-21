'use strict';

var browserify = require('browserify');
var es6ify = require('es6ify');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

var testFiles = glob.sync(path.resolve(__dirname, '../test/*.js')).map(function (p) { return path.resolve(p); });
var bundlePath = path.resolve(process.cwd(), process.argv[2]);

var browserifyInstance = browserify({ debug: true }).add(es6ify.runtime).transform(es6ify);

// Work around https://github.com/substack/node-browserify/issues/873
testFiles.forEach(function (file) {
  browserifyInstance.add(file);
});

browserifyInstance
  .bundle()
  .pipe(fs.createWriteStream(bundlePath));
