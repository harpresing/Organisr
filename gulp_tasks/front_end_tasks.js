const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const del = require("del");

//This will cause the browser to reload automatically
gulp.task("browser-sync",()=>{
  browserSync.init({
    proxy: 'localhost:5001'
  });
  gulp.watch("app/views/*").on('change', browserSync.reload);
  gulp.watch("front_end_src/*").on('change', browserSync.reload);
});

gulp.task("clean:public/images",()=>{
  return del(["public/images"]);
});
//Compiles SCSS to CSS
// TODO: Get the source maps to work
gulp.task("styles",()=>{
  return gulp.src("./front_end_src/scss/**/*.scss")
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(sourcemaps.init())
  .pipe(concat("styles.css"))
  .pipe(gulp.dest("./public/stylesheets"))
  .pipe(browserSync.stream());
});

//Compresses and optimise images
gulp.task("images",()=>{
  return gulp.src('front_end_src/images/*')
    	.pipe(imagemin({
        		progressive: true
      }))
      .pipe(gulp.dest('./public/images'))
      .pipe(browserSync.stream());
});
// TODO: Add Javascript task here
