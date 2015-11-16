const path = require('path');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const compass = require('gulp-compass');
const livereload = require('gulp-livereload');

gulp.task('compass', () => {
  gulp.src('./src/sass/app.scss')
    .pipe(compass({
      project: path.join(__dirname, '.'),
      css: 'dist',
      style: 'compressed',
      sass: 'src/sass'
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});

gulp.task('js', function() {
  return browserify({
      entries: './src/app.js',
      paths: ['./node_modules', './src/'],
      debug: true
    })
    .transform(babelify, {
      presets: ['es2015']
    })
    .bundle()
    .on('error', (err) => console.error(err))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('build', ['js', 'compass']);

gulp.task('watch', ['build'], function() {
  livereload.listen();
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/**/*.scss', ['compass']);
});

gulp.task('default', ['watch']);
