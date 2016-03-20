'use strict';

const angular = require('angular');


//Dependancies
require("./dependancies/mdPickers");

require('./controllers/index');
require('./controllers/ui/navbar_layout');
require('./components/index');

const app = angular.module('organisrApp',['ngComponentRouter','ngMaterial','mdPickers',
'OrganisrController','OrganisrComponents']);

app.config(["$mdThemingProvider",
  ($mdThemingProvider)=>{
    $mdThemingProvider.theme('default').primaryPalette('light-blue',{
      'default':'700',
      'hue-1':'600'
    })
    .accentPalette('red',{
      'default': '700'
    });
}]);

app.config(["$locationProvider",($locationProvider)=>{
  $locationProvider.html5Mode(true);
}]);
app.value('$routerRootComponent', 'app');
