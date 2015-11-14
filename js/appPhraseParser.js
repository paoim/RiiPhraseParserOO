var appPhraseParser = angular.module("appJsPhraseParser", []);

/* Create Route Configure */
appPhraseParser.config(function($routeProvider) {
	$routeProvider
	.when('/home', {
		controller : 'ContentController',
		templateUrl : 'view/homeContent.html'
	})
	.when('/contact', {
		templateUrl : 'view/contact.html'
	})
	.when('/about', {
		templateUrl : 'view/about.html'
	})
	.otherwise({
		redirectTo : '/home'
	});
});