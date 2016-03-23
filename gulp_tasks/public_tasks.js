const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const fs = require('fs');
const path = require('path');
const uglify = require("gulp-uglify");

//This will cause the browser to reload automatically
gulp.task("browser-sync",()=>{
  browserSync.init({
    proxy: 'localhost:5001'
  });
  gulp.watch("app/views/**/*").on('change', browserSync.reload);
  gulp.watch("public/**/*").on('change', browserSync.reload);
});


gulp.task("clean:public/images",()=>{
  return del(["dist/images"]);
});
//Compiles SCSS to CSS
// TODO: Get the source maps to work

gulp.task("styles",()=>{
  getDirectories("./public/scss").map((dir) => {
    styles(dir);
  });
});

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter((file) =>{
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function styles(scssDirectory) {
  return gulp.src(`./public/scss/${scssDirectory}/**/*.scss`)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(concat(`${scssDirectory}-styles.css`))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("./dist/stylesheets"))
  .pipe(browserSync.stream());
}
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

gulp.task("vendor_scripts",()=>{
  return gulp.src('./public/vendor_scripts/**/*.js')
  .pipe(concat("vendor.js"))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/scripts'));

});
