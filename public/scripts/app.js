const FB = require("FB");

FB.init({
  appId: '1518392685131105',
  status: true,
  cookie: true,
  xfbml: true,
  version: 'v2.4'
});

const angular = require('angular');


require('./controllers/index');
require('./controllers/ui/navbar_layout');
require('./directives/index');
require('./components/index');

const app = angular.module('organisrApp',['ngComponentRouter','ngMaterial','OrganisrController',
'OrganisrDirective','OrganisrComponents']);

app.config(["$mdThemingProvider",
  ($mdThemingProvider)=>{
    $mdThemingProvider.theme('default').primaryPalette('light-blue',{
      'default':'700'
    })
    .accentPalette('red',{
      'default': '700'
    });
}]);

app.value('$routerRootComponent', 'app');
