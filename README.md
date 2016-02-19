# Organisr
Sever Side Application

## Run Server Locally
- Install node
- Run `npm install --global gulp-cli`
- Run `npm i` to download project dependancies
- Run `gulp` or either the shell/bash scripts.

## Deploying Server
- `cd` into working directory
- Run `npm startProd` will open on port 80
- Run `gulp` in the root of the project, this will open your default browser on port 3000

## Development Environment
- Stephen
  - Atom Text Editor
  - ITerm 2 (with zsh)
  - ESLint

## Technologies
- MongoDB
- Angular 1.x or 2.x?
- NodeJs
- ExpressJs
- Angular Material?
- GulpJs

## Project Structure
The structure of the project:
```
.
├── Procfile
├── README.md
├── app
│   ├── controllers
│   │   ├── account.js
│   │   ├── authentication.js
│   │   └── main.js
│   ├── helpers
│   │   └── password.js
│   ├── middleware
│   │   └── authentication.js
│   ├── models
│   │   ├── schema.js
│   │   └── user.js
│   ├── routes
│   │   ├── authentication.js
│   │   └── index.js
│   └── views
│       ├── dashboard.ejs
│       ├── index.ejs
│       └── login.ejs
├── config
│   ├── environments
│   │   ├── development.js
│   │   └── production.js
│   ├── index.js
│   ├── models.js
│   ├── mongoose.js
│   ├── passport.js
│   ├── routes.js
│   └── strategies
│       └── local.js
├── front_end_src
│   ├── images
│   │   ├── favicon.ico
│   │   ├── food.jpeg
│   │   ├── hero_img.JPG
│   │   └── user.jpg
│   └── scss
│       ├── dashboard_page.scss
│       └── login_page.scss
├── gulp_tasks
│   ├── front_end_tasks.js
│   └── tests.js
├── gulpfile.js
├── package.json
├── server.js
├── tests
│   └── server
│       └── index_tests.js
├── unix_deploy.sh
└── windowDeploy.bat
```
<i>The file structure was created using `tree -I 'node_modules'`</i>

#### Gulpfile.js
- Build system for automating tasks
- Any tasks that you want to be run by default can be called here
- Any new tasks should be put into their own file and placed in the `gulp_tasks` folder.

#### Front End Src
- Contains all the static resources that are available to the client.  

#### Public
- All the processed resources are to be deposited here.
#### Routes
- All routes that are to be made available should be placed here

#### Tests
- Tests for both the server and client should be placed here.
- The testing libraries being uses are:
  - Mocha
  - Chai
  - Chai Http

#### Views
- Files are are dynamically rendered using Handlebars before being sent to the client.

#### Server.js
- Main hook for initialising our application

<i>Document is not set in stone and is subject to change.</i>

## Project Dependancies
- <a href="http://expressjs.com/">ExpressJS</a>
- <a href="http://gulpjs.com/">Gulp.js</a>
- <a href="https://mochajs.org/">Mocha</a>
- <a href="http://chaijs.com/">Chai</a>
- <a href="https://www.npmjs.com/">NpmJS</a>
- <a href="http://www.embeddedjs.com/">Embedded JavaScript (.ejs)</a>
- <a href="http://www.getmdl.io/">MDL</a>
- <a href="https://www.browsersync.io/">BrowserSync</a>

## BrowserSync
- This allows you to perform live reloading of the public resources and html files.

## Interesting Articles
- Testing <a href="http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.VqvXA7CLSHo">Express</a>
- <a href="http://www.cyberciti.biz/tips/nohup-execute-commands-after-you-exit-from-a-shell-prompt.html">Ubuntu VM stuff</a>
- <a href="http://www.restapitutorial.com/lessons/httpmethods.html">Restful Methods</a>

## Heroku
The app is now deployed on Heroku, and it is set to track the master branch.
<a href="https://vast-cove-15144.herokuapp.com/">App on Heroku</a>

## Development Practice
It would be best that we use a development branch to push all our changes to Github and make a pull request to the master branch. That way we can all get a chance to review the code before we change our master branch.


## Technologies
- MongoDB
- Angular 1.x or 2.x?
- NodeJs
- ExpressJs
- Angular Material?
- GulpJs

<i>We can discuss these later</i>
