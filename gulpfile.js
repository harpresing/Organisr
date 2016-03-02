"use strict";

const gulp = require("gulp");
const requireDir = require("require-dir");
/*eslint-disable */
const _tasks = requireDir('./gulp_tasks');
/*eslint-enable */

function gulpTasks() {
  gulp.start("test");
  gulp.start("browser-sync");
  gulp.watch("tests/**/*.js",["test"]);
  gulp.watch("app/**/*",["test"]);
  gulp.watch("public/scss/**/*.scss",["styles"]);
  gulp.watch("public/scripts/**/*.js",["watch-js"]);
  gulp.watch("public/images/*",["clean:public/images","images"]);
}
gulp.task('default',["start-server","styles","images","build-js"],()=>{
  gulpTasks();
});

gulp.task('prod',["styles","images"],()=>{});

gulp.task('front-end',["styles","images","build-js","html"],()=>{
  gulpTasks();
});
