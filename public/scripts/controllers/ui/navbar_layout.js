module.exports = {
  name: 'navBarLayoutCtrl',
  controller: ['$scope','$mdSidenav',($scope,$mdSidenav)=>{
    $scope.toggleSideNav = ()=>{
      $mdSidenav('side-menu-left').toggle();
    };
  }]
};
