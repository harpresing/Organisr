const angular = require("angular");
const zoopController = angular.module('zoopController',[]);

zoopController.controller('indexCtrl',['$scope',($scope)=>{
  $scope.test = "Hello World";
}]);

module.exports = zoopController;
