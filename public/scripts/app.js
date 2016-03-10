'use strict';

const angular = require('angular');

require('./dependancies/sc-date-time');
require('./controllers/index');
require('./controllers/ui/navbar_layout');
require('./directives/index');
require('./components/index');

const app = angular.module('organisrApp',['scDateTime','ngComponentRouter','ngMaterial',
'OrganisrController','OrganisrDirective','OrganisrComponents']);

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

app.value('scDateTimeConfig', {
		    defaultTheme: 'material',
		    autosave: true,
		    defaultMode: 'date'/'time',
		    defaultDate: undefined,
		    displayMode: undefined,
		    defaultOrientation: false,
		    displayTwentyfour: true,
        "on-save": "saveDate($value)",
		    compact: true
		});
