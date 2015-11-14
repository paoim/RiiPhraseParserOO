


appPhraseParser.controller('ContentController',['$scope','$rootScope','uploadService', function($scope, $rootScope, uploadService) {
	$scope.csvFile;
	$scope.csvItems = [];

	$scope.$watch('csvFile', function(newValue, oldValue) {
		// Only act when our property has changed.
		if (newValue != oldValue) {
			//console.log('Controller: $scope.files changed. Start upload.');
			//uploadService.readCsv($scope.csvFile);
			console.log($scope.csvItems);
		}
	}, true);

//	$rootScope.$on('upload:loadstart', function() {
//		console.log('Controller: on `loadstart`');
//	});
//
//	$rootScope.$on('upload:error', function() {
//		console.log('Controller: on `error`');
//	});

} ]);

appPhraseParser.factory('uploadService', [ '$rootScope', function($rootScope) {

	return {
		readCsv : function(fileToRead){
			
			// Check for the various File API support.
			if (window.FileReader) {
				// FileReader are supported.
				var reader = new FileReader();
				
				// Handle errors load
				reader.onload = function(event){
					//console.log('Factory: upload started: ', fileToRead.name);
					//$rootScope.$emit('upload:loadstart', reader);
					
					var csvItemsList = [];
					var csv = event.target.result;
					var allTextLines = csv.split(/\r\n|\n/);
					while (allTextLines.length) {
						csvItemsList.push(allTextLines.shift().split(','));
					}
					
					console.log(csvItemsList);
					$rootScope.csvItems = csvItemsList;
				};
				
				reader.onerror = function(event){
					if (event.target.error.name == "NotReadableError") {
						alert("Canno't read file!");
						//$rootScope.$emit("upload:Canno't read file !", event);
					}
				};
				
				// Read file into memory as UTF-8
				reader.readAsText(fileToRead);
				
			} else {
				alert('FileReader are not supported in this browser.');
			}
		}
	};

} ]);