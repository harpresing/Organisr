module.exports = {
  name: 'NavBarLayoutCtrl',
  controller: ['$scope','$mdSidenav',($scope,$mdSidenav)=>{
    $scope.toggleSideNav = ()=>{
      $mdSidenav('side-menu-left').toggle();
    };

    $scope.closeNav = ()=>{
      $mdSidenav('side-menu-left').close();
    };
  }]
};
