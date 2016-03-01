const angular = require('angular');
const OrganisrDirective = angular.module('OrganisrDirective',[]);

const menuNav = require('./menuNav');

OrganisrDirective.directive(menuNav.name,menuNav.directive);
