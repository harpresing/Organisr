const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify");
const util = require('gulp-util');
function compile(watch) {
  var bundler = watchify(browserify('./public/scripts/app.js', { debug: true }).transform(babel,{presets: ["es2015"]}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      // .pipe(ingore.exclude(["**/*.map"]))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/scripts'));
      browserSync.reload();
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}

gulp.task('prod-build-js',()=>{
  var bundler = browserify('./public/scripts/app.js', { debug: true }).transform(babel,{presets: ["es2015"]});
  return bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(uglify().on('error',util.log))
    .pipe(gulp.dest('./dist/scripts'));
});
gulp.task('build-js', function() { return compile(); });
gulp.task('watch-js', function() { return watch(); });
