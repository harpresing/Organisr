module.exports = {
  name: 'ManageClubCtrl',
  controller: ['$http','$scope','$mdToast',($http,$scope,$mdToast)=>{
    $scope.hello = "Hello Harpreet!!";
    $scope.getClubs = ()=>{$http({
        method: 'GET',
        url: 'fb/set-user-admin-groups'
      }).then((response)=>{
        $mdToast.show(
            $mdToast.simple()
            .textContent(response.data)
            .hideDelay(3000)
        );
        console.log(response);
      },()=>{
        $mdToast.show(
            $mdToast.simple()
            .textContent('Oops Something went wrong!')
            .position("left")
            .hideDelay(3000)
        );
      });
    };
  }]
};

function successCB(response) {
  return response;
}
function errorCB(response) {
  return response;
}
