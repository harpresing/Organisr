
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
				console.log("Invoked");
				$http({
					method:"GET",
					url: 'fb/get-group-admins',
					params:{"id":groupID}
				}).then((response)=>{
					this.admins = response.data;
					console.log(response);
				});
			};

			this.createSession = (train)=>{
				$http.post("fb/create-training-session",train).success((response)=>{
					console.log("Session Created");
				});

			this.showAlert = function(ev) {
				console.log("success");
                $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('You Go, Captain!')
                .textContent('Session Created! You can view it in My Sessions')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );

			}
			};

	}
]
};
