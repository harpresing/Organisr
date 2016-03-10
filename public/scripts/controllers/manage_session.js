
module.exports = { name:"ManageSession",
controller:['$http',"$scope",function($http,$scope){
			$http({
	        method: 'GET',
	        url: 'fb/get-groups'
	      }).then((response)=>{
					console.log(response);
					$scope.groups = response.data;
				},(response)=>{
					console.log(response);
				});
	}
]
};
