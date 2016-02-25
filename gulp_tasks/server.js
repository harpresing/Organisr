var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task("start-server",()=>{
  return nodemon({
    script: 'server.js'
  });
});
