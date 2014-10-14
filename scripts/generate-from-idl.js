import generator from 'webidl-class-generator';

var fs = require('fs');
var path = require('path');
var mkdirpSync = require('mkdirp').sync;

var idlDirectory = path.resolve(__dirname, '../src/idl');
var jsDirectory = path.resolve(__dirname, '../src/elements');

mkdirpSync(jsDirectory);

fs.readdirSync(idlDirectory).forEach(idlFileName => {
  var idlFilePath = path.resolve(idlDirectory, idlFileName);
  var idlContents = fs.readFileSync(idlFilePath, { encoding: 'utf-8' });

  var basename = path.basename(idlFileName, '.idl');
  var implModuleName = `./${basename}-impl.js`;
  var generatedJS = generator(idlContents, implModuleName);
  var jsFilePath = path.resolve(jsDirectory, basename + '.js');
  fs.writeFileSync(jsFilePath, generatedJS);
});
