module.exports = {
  name: 'NavBarLayoutCtrl',
  controller: ['$scope','$mdSidenav',($scope,$mdSidenav)=>{
    $scope.toggleSideNav = ()=>{
      $mdSidenav('side-menu-left').toggle();
    };

    $scope.closeNav = ()=>{
      $mdSidenav('side-menu-left').close();
    };

    $scope.menuLinks = [
      {
        pageName: 'Home',
        componment: 'Home',
        icon: 'home'
      },
      {
        pageName: 'Manage Training Session',
        componment: 'ManageSession',
        icon: 'person_add'
      },
      {
        pageName: 'My Sessions',
        componment: 'MySession',
        icon: 'directions_run'
      }
    ];
  }]
};
