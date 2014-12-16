'use strict';
const path = require('path');
const gulp = require('gulp');
const through2 = require('through2');
const gutil = require('gulp-util');
import webidlClassGenerator from 'webidl-class-generator';

gulp.task('generate-from-idl', () => {
  gulp.src('./src/idl/*.idl')
    .pipe(idlToJS())
    .pipe(gulp.dest('./src/elements'));
});


function idlToJS() {
  return through2.obj((file, enc, cb) => {
    const basename = path.basename(file.path, '.idl');
    const implModuleName = `./${basename}-impl.js`;

    let generatedJS;
    try {
      generatedJS = webidlClassGenerator(file.contents.toString('utf8'), implModuleName);
    } catch (e) {
      return cb(new gutil.PluginError('webidl class generator', e));
    }

    file.contents = new Buffer(generatedJS);
    file.path = gutil.replaceExtension(file.path, '.js');

    cb(null, file);
  });
}
