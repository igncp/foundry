const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');

gulp.task('sass', () => {
  gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('js', function() {
  return browserify({
      entries: './src/app.js',
      paths: ['./node_modules','./src/'],
      debug: true
    })
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .on('error', (err) => console.error(err))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('build', ['js', 'sass']);

gulp.task('watch', ['build'], function() {
  livereload.listen();
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
