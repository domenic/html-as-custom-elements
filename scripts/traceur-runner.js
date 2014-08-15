'use strict';
var traceur = require('traceur');
var path = require('path');

// TODO: create a project (or perhaps pull-request into Traceur) that consults package.json for some property, e.g.
// `"es6": true` or `"traceur-ready": true` or `"esnext:main": <anything>` or something, and automatically builds the
// whitelist. (In a much more robust fashion than the string indexOf-ing we are doing below, of course.)
// I keep re-creating variants of this file for every Traceur-using project.

var whitelist = ['webidl-class-generator', 'webidl-conversions', 'webidl-html-reflector'];

traceur.require.makeDefault(function (modulePath) {
  var isDependency = modulePath.indexOf('node_modules') !== -1;
  var isWhitelistedPackage = whitelist.some(function (p) { return modulePath.indexOf(p) !== -1; });

  return !isDependency || isWhitelistedPackage;
});

require(path.resolve(process.cwd(), process.argv[2]));
