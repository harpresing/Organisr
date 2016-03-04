const angular = require("angular");
const OrganisrController = angular.module('OrganisrController',[]);

const navbarController = require('./ui/navbar_layout');
const manageClubController = require('./manage_club');

OrganisrController.controller(navbarController.name,navbarController.controller);
OrganisrController.controller(manageClubController.name,manageClubController.controller);
module.exports = OrganisrController;
