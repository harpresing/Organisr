const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test',()=> {
  return gulp.src('tests/**/*.js')
    .pipe(mocha({
        reporter: 'nyan'
    }));
});
