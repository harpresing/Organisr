"use strict";

const gulp = require("gulp");
const requireDir = require("require-dir");
/*eslint-disable */
const _tasks = requireDir('./gulp_tasks');
/*eslint-enable */

gulp.task('default',["start-server","styles","images"],()=>{
  gulp.start("test");
  gulp.start("browser-sync");
  gulp.watch("app/views/**/*",["ejs"]);
  gulp.watch("tests/**/*.js",["test"]);
  gulp.watch("app/**/*.js",["test"]);
  gulp.watch("front_end_src/scss/**/*.scss",["styles"]);
  gulp.watch("front_end_src/images/*",["clean:public/images","images"]);
});

gulp.task('prod',["styles","images"],()=>{});
