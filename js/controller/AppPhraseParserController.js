
appPhraseParser.controller('NavbarController', function($scope, $location, menuItems) {
	$scope.menuList = menuItems.menuList;
	
	$scope.getClass = function(path) {
		
		return ($location.path().substr(0, path.length) == path);
	};
});