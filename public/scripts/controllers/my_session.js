module.exports = { name:"MySessions",
controller:[ '$http', '$scope' ,function($http, $scope){
        	$http({
                 method  : 'GET',
                 url     : '/get-training-sessions'
            }).then(function (response){
                console.log(response.status);
                $scope.sessions = response.data;
                console.log($scope.sessions.length);
                 if ($scope.sessions.length == 0){
                    $scope.sessionsAvailable = false;
                    console.log("Sessions are not available");
                } else{
                    console.log("Sessions are available");
                    $scope.sessionsAvailable = true;
                }
            }, function errorCallback(response){
                console.log(response.status);
            });

}]};
