const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const stringify = require('stringify');
const sassify = require('sassify');

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const ngAnnotate = require('gulp-ng-annotate');

gulp.task('bundle', function() {
  return browserify({
      entries: './src/main.js',
      paths: ['./node_modules', './src/'],
      debug: true
    })
    .transform(stringify(['.html']))
    .transform(sassify, {
      'auto-inject': true,
      base64Encode: false,
      includePaths: ['./src/'],
      sourceMap: false
    })
    .bundle()
    .on('error', (err) => console.error(err))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('build', ['bundle']);

gulp.task('watch', ['bundle'], function() {
  livereload.listen();
  gulp.watch('./src/**/*.js', ['bundle']);
  gulp.watch('./src/**/*.html', ['bundle']);
  gulp.watch('./src/**/*.scss', ['bundle']);
});

gulp.task('default', ['watch']);
