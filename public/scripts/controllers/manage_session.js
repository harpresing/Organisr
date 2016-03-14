
module.exports = { name:"ManageSession",
controller:['$http','$mdToast',function($http,$mdToast){
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
					$mdToast.show(
	            $mdToast.simple()
	            .textContent(response)
	            .hideDelay(3000)
	        );
				});
			};

	}
]
};
