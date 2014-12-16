const path = require('path');
const watchify = require('watchify');
const browserify = require('browserify');
const gulp = require('gulp');
const changed = require('gulp-changed');
const through2 = require('through2');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
import webidlClassGenerator from 'webidl-class-generator';

const TRACEUR_RUNTIME = require.resolve('traceur/bin/traceur-runtime.js');
const DEMO_GENERATED_DEST = './demo/generated';
const DEMO_STYLES_SOURCE = './src/styles/*.css';
const DEMO_STYLES_DEST = './demo/styles';
const IDL_SOURCE = './src/idl/*.idl';
const ELEMENTS_DEST = './src/elements';
const BUNDLE_FILENAME = 'bundle.js';

gulp.task('generate-from-idl', () => {
  gulp.src(IDL_SOURCE)
    .pipe(changed(ELEMENTS_DEST))
    .pipe(idlToJS())
    .pipe(gulp.dest(ELEMENTS_DEST));
});

gulp.task('watch', () => {
  const bundler = watchify(browserify('./demo/entry.js', watchify.args), { debug: true }).transform('es6ify');
  bundleDemo(bundler);
  bundler.on('update', () => bundleDemo(bundler));

  gulp.watch(IDL_SOURCE, ['generate-from-idl']);
  gulp.watch(TRACEUR_RUNTIME, copyTraceurRuntime);
  gulp.watch(DEMO_STYLES_SOURCE, copyCSS);
});

gulp.task('demo', () => {
  bundleDemo(browserify('./demo/entry.js', { debug: true }));
  copyTraceurRuntime();
  copyCSS();
});

function bundleDemo(bundler) {
  return bundler.bundle()
    .pipe(source(`./${BUNDLE_FILENAME}`))
    .pipe(gulp.dest(DEMO_GENERATED_DEST));
}

function copyCSS() {
  gulp.src(DEMO_STYLES_SOURCE)
    .pipe(changed(DEMO_STYLES_DEST))
    .pipe(gulp.dest(DEMO_STYLES_DEST));
}

function copyTraceurRuntime() {
  gulp.src(TRACEUR_RUNTIME)
    .pipe(changed(DEMO_GENERATED_DEST))
    .pipe(gulp.dest(DEMO_GENERATED_DEST));
}

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
