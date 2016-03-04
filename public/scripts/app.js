const angular = require('angular');



require('./controllers/index');
require('./controllers/ui/navbar_layout');
require('./directives/index');

const app = angular.module('organisrApp',['ngRoute','ngMaterial','OrganisrController','OrganisrDirective']);

app.config(["$routeProvider","$mdThemingProvider",
  ($routeProvider,$mdThemingProvider)=>{
    $routeProvider.when('/home',{
      templateUrl: './partials/views/home/index.html',
      controller:'ManageClubCtrl'
    }).when('/manage-club',{
      templateUrl:'./partials/views/manage_club/index.html'
    }).otherwise({
      redirectTo: '/home'
    });

    $mdThemingProvider.theme('default').primaryPalette('light-blue',{
      'default':'700'
    })
    .accentPalette('red',{
      'default': '700'
    });
}]);
