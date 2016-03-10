const angular = require("angular");
const OrganisrComponents = angular.module('OrganisrComponents',[]);

const app = require("./app");
const home = require("./home");
const mySession = require("./my-session");
const manageSession = require("./manage-session");

OrganisrComponents.component('app',app);
OrganisrComponents.component('home',home);
OrganisrComponents.component('mySession',mySession);
OrganisrComponents.component('manageSession',manageSession);

module.exports = OrganisrComponents;
