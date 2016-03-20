module.exports = {
  name: 'ManageClubCtrl',
  controller: ['$http','$scope','$mdToast',($http,$scope,$mdToast)=>{
    // $scope.setClubs = ()=>{
    $http({
      method: 'GET',
      url: 'fb/set-user-admin-groups'
    }).then((response)=>{
      // onSuccess
      $mdToast.show(
          $mdToast.simple()
          .textContent(response.data)
          .hideDelay(3000)
      );
      console.log(response);
    },()=>{
      // onFailure
      $mdToast.show(
          $mdToast.simple()
          .textContent('Oops Something went wrong!')
          .position("left")
          .hideDelay(3000)
      );
    });
    // };
//Get groups
    $http({
        method: "GET",
        url: 'fb/get-groups'
    }).then((response)=>{
      console.log(response);
      $scope.groups = response.data;
    },(response)=>{
      console.log(response);
    });
  }]
};
