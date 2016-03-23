var angular = require('angular');
module.exports = { name:"ManageSession",
controller:['$http','$mdDialog','$mdToast', function($http,$mdDialog,$mdToast){
	this.isDisabled = true;
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
		this.isDisabled = false;
		$http({
			method:"GET",
			url: 'fb/get-group-members',
			params:{"id":groupID}
		}).then((response)=>{
			this.members = response.data;

		});
	};
	this.createSession = (train,ev)=>{
		$http.post("fb/create-training-session",train).success((response)=>{
			if (response.error) {
				$mdToast.show(
						$mdToast.simple()
						.textContent(response.message)
						.hideDelay(3000)
				);
			}else{
				this.isDisabled = true;
				this.newSession = response;
				showAlert(ev,$mdDialog,$http,this.newSession);
			}
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

function showAlert(ev,$mdDialog,$http,newSession) {

	$mdDialog.show({
		controller: DialogController,
		templateUrl: "./partials/components/post-dialog.html",
		parent: angular.element(document.body),
		targetEvent:ev,
		clickOutsideToClose:true
	}).then((message)=>{
		const data = Object.assign(newSession,{message:message});
		$http.post("fb/post-to-group",data).success(()=>{
			console.log("Posted");
		});
	});
}
