var angular = require('angular');
module.exports = { name:"ManageSession",
controller:['$http','$mdDialog', function($http,$mdDialog){
			$http({
	        method: 'GET',
	        url: 'fb/get-groups'
	      }).then((response)=>{
					console.log(response);
					this.groups = response.data;
				},(response)=>{
					console.log(response);
				});

			this.getInstructors = (groupID)=>{
				$http({
					method:"GET",
					url: 'fb/get-group-members',
					params:{"id":groupID}
				}).then((response)=>{
					this.members = response.data;
					console.log(response);
				});
			};

			this.createSession = (train)=>{
				$http.post("fb/create-training-session",train).success((response)=>{
					this.newSession = response;
					console.log(response);
				});

			};
			this.showAlert = function(ev) {
				console.log("success");
        $mdDialog.show({
					controller: DialogController,
					templateUrl: "./partials/components/post-dialog.html",
					parent: angular.element(document.body),
					targetEvent:ev,
					clickOutsideToClose:true
				}).then((message)=>{
					console.log("Response");
					console.log(this.newSession);
					console.log(message);
					const data = Object.assign(this.newSession,{message:message});
					console.log(data);
					$http.post("fb/post-to-group",data).success(()=>{
						console.log("Posted");
					});
				});
			};
	}
]
};

function DialogController($scope,$mdDialog) {
	$scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
	$scope.postToFb = ()=>{
		$mdDialog.hide($scope.message);
	};
}
