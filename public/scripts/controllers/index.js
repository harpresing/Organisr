const angular = require("angular");
const OrganisrController = angular.module('OrganisrController',[]);

const navbarController = require('./ui/navbar_layout');
const manageClubController = require('./manage_club');
const sessionController = require('./manage_session');
const mySessionsCtrl = require('./my_session');

OrganisrController.controller(navbarController.name,navbarController.controller);
OrganisrController.controller(manageClubController.name,manageClubController.controller);
OrganisrController.controller(sessionController.name,sessionController.controller);
OrganisrController.controller(mySessionsCtrl.name,mySessionsCtrl.controller);
module.exports = OrganisrController;
