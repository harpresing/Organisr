module.exports = { name:"MySessions",
controller:[ '$http', '$scope' ,function($http, $scope){
  $scope.sessionsAvailable = false;
        	$http({
                 method  : 'GET',
                 url     : '/get-training-sessions'
            }).then(function (response){
                console.log(response.status);
                 if (response.data.length == 0){
                    $scope.sessionsAvailable = false;
                    console.log("Sessions are not available");
                } else{
                    console.log("Sessions are available");
                    console.log(response.data);
                    $scope.sessionsAvailable = true;
                    $scope.events = response.data;
                }
            }, function errorCallback(response){
                console.log(response.status);
            });

}]};
