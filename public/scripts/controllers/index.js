const angular = require("angular");
const OrganisrController = angular.module('OrganisrController',[]);

const navbarController = require('./ui/navbar_layout');

OrganisrController.controller('indexCtrl',['$scope',($scope)=>{
  // $scope.test = "Hello World";
}]);

OrganisrController.controller(navbarController.name,navbarController.controller);
module.exports = OrganisrController;
