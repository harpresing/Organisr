const angular = require('angular');



require('./controllers/index');
require('./controllers/ui/navbar_layout');
require('./directives/index');

const app = angular.module('organisrApp',['ngMaterial','OrganisrController','OrganisrDirective']);

app.config(["$mdThemingProvider",($mdThemingProvider)=>{
  $mdThemingProvider.theme('default').primaryPalette('light-blue',{
    'default':'700'
  })
  .accentPalette('red',{
    'default': '700'
  });
}]);
