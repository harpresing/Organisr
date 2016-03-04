const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const spawn = require('child_process').spawn;
const nodeCMD = spawn('node', ['server.js']);


gulp.task("start-nodemon-server",()=>{
  return nodemon({
    script: 'server.js'
  });
});

gulp.task("start-node-server",()=>{
    nodeCMD.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    nodeCMD.stderr.on('data', (data) => {
      console.log(`${data}`);
    });

    nodeCMD.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
});
