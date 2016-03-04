# Organisr
Sever Side Application

## Run Server Locally
- Install node
- Install Mongo
- Run `npm i -g nodemon`
- Run `mongod` in a separate terminal window
- In root of project run `nodemon`
- Developing the front end app
  - run `node sever.js`
  - In another terminal `gulp front-end`

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
├── Procfile
├── README.md
├── app
│   ├── controllers
│   │   ├── account.js
│   │   ├── authentication.js
│   │   ├── emailCredController.js
│   │   └── main.js
│   ├── helpers
│   │   └── password.js
│   ├── middleware
│   │   └── authentication.js
│   ├── models
│   │   ├── emailCredential.js
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
│       ├── facebook.js
│       └── local.js
├── dist
│   ├── images
│   │   ├── favicon.ico
│   │   ├── food.jpeg
│   │   ├── hero_img.JPG
│   │   └── user.jpg
│   └── stylesheets
│       └── styles.css
├── gulp_tasks
│   ├── browserify.js
│   ├── front_end_tasks.js
│   ├── server.js
│   └── tests.js
├── gulpfile.js
├── package.json
├── public
│   ├── images
│   │   ├── favicon.ico
│   │   ├── food.jpeg
│   │   ├── hero_img.JPG
│   │   └── user.jpg
│   └── scss
│       └── login_page.scss
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

#### Public
- Contains all the static resources that are available to the client.  

#### Dist
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

## Quirks with the build
- If you've got tabs in your browser pointing to localhost:3000, close them when your finished as they keep trying to connect to port 5001
