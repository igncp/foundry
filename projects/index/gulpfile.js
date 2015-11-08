const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return browserify({
      entries: './src/app.js',
      debug: true
    })
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .on('error', (err) => console.error(err))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['js', 'sass'], function() {
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
