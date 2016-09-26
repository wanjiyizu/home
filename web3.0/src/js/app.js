angular.element(document).ready(function(){
	angular.bootstrap(document, ["app"]);
});

var app = angular.module("app", ["app.controllers"]),
	appControllers = angular.module("app.controllers", []);


appControllers.controller("headerCtrl", ["$rootScope", function($rootScope){
	$rootScope.appHeader = "simu";
}]);

appControllers.controller("footerCtr", function($scope){

	$scope.toggleCode = function(){
		$scope.isShow = !$scope.isShow;
	}

	$scope.closeCode = function(){
		$scope.isShow = false;
	}

});
