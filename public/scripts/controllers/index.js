const angular = require("angular");
const organisrController = angular.module('organisrController',[]);

organisrController.controller('indexCtrl',['$scope',($scope)=>{
  $scope.test = "Hello World";
}]);

module.exports = organisrController;
