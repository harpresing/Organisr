module.exports = { name:"MySessions",
controller:[ '$http', '$scope', '$mdToast',function($http, $scope,$mdToast){
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
        $scope.sessionsAvailable = true;
        $scope.events = response.data;
        // console.log(response.data);
        getSessionInfo();
      }
    }, function errorCallback(response){
      console.log(response.status);
  });

  this.joinSession = (sessionId)=>{
    $http.post("participant/join-session",{sessionId:sessionId}).success((response)=>{
      $mdToast.show(
        $mdToast.simple()
          .textContent("Joined")
          .position("top right")
          .hideDelay(3000)
      );
      console.log(response);
      getSessionInfo();
    });
  };

  this.leaveSession = (sessionId)=>{
    $http.post("participant/leave-session",{sessionId:sessionId}).success((response)=>{
      $mdToast.show(
        $mdToast.simple()
          .textContent(response)
          .position("top right")
          .hideDelay(3000)
      );
      console.log(response);
      getSessionInfo();
    });
  };

  function getSessionInfo() {
    $scope.events.map((ev)=>{
      ev.sessions.map((session) => {
        $http({
         method  : 'GET',
         url     : 'participant/get-all',
         params:{sessionId:session._id}
       }).then((response)=>{
         const participants = response.data.participants;
         const userId = response.data.userId;
         console.log(userId);
         const isAttending = participants.filter((participant) => {
           return participant.userId === userId;
         }).length === 1;
         console.log(isAttending);
         return Object.assign(session,{participants:participants},{isAttending:isAttending});
        });
      });
    });
  }
}]};
