const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const del = require("del");
const htmlmin = require("gulp-htmlmin");

gulp.task("browser-sync",()=>{
  browserSync.init({
    proxy: 'localhost:5001'
  });
  gulp.watch("app/views/*").on('change', browserSync.reload);
  gulp.watch("public/**/*").on('change', browserSync.reload);
});


gulp.task("clean:public/images",()=>{
  return del(["dist/images"]);
});
//Compiles SCSS to CSS
// TODO: Get the source maps to work

gulp.task("styles",()=>{
  return gulp.src("./public/scss/**/*.scss")
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(sourcemaps.init())
  .pipe(concat("styles.css"))
  .pipe(gulp.dest("./dist/stylesheets"))
  .pipe(browserSync.stream());
});

//Compresses and optimise images
gulp.task("images",()=>{
  return gulp.src('public/images/*')
    	.pipe(imagemin({
        		progressive: true
      }))
      .pipe(gulp.dest('./dist/images'))
      .pipe(browserSync.stream());
});

gulp.task("ejs",()=>{
  return gulp.src("./app/views/**/*")
    .pipe(browserSync.stream());
});

gulp.task("html",()=>{
  return gulp.src("./public/partials/**/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist/partials'));
});
