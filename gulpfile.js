"use strict";

const gulp = require("gulp");
const requireDir = require("require-dir");
/*eslint-disable */
const _tasks = requireDir('./gulp_tasks');
/*eslint-enable */

function gulpTasks() {
  gulp.start("vendor_scripts");
  gulp.start("test");
  gulp.start("browser-sync");
  gulp.watch("tests/**/*.js",["test"]);
  gulp.watch("app/**/*",["test"]);
  gulp.watch("public/scss/**/*.scss",["styles"]);
  gulp.watch("public/scripts/**/*.js",["watch-js"]);
  gulp.watch("public/images/*",["clean:public/images","images"]);
  gulp.watch("public/partials/**/*.html",["html"]);
}
gulp.task('default',["start-server","styles","build-js","html"],()=>{
  gulpTasks();
});

gulp.task('prod',["styles","images","prod-build-js","vendor_scripts","html"],()=>{});

gulp.task('front-end',["styles","build-js","html"],()=>{
  gulpTasks();
});
