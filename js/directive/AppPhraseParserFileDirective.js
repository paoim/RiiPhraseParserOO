//appPhraseParser.directive('fileModel', [ '$parse', function($parse) {
//	return {
//		restrict : 'A',
//		link : function(scope, element, attrs) {
//			var model = $parse(attrs.fileModel);
//			var modelSetter = model.assign;
//
//			element.bind('change', function() {
//				scope.$apply(function() {
//					var files = element[0].files;
//					modelSetter(scope, files[0]);
//					filesHandler(files);
//				});
//			});
//		}
//	};
//} ]);

appPhraseParser.directive('fileChange', function() {

	var linker = function($scope, element, attributes) {
		element.bind('change', function(event) {
			$scope.$apply(function() {
				var files = event.target.files;
				if (files) {
					var fileToRead = files[0];
					$scope.csvFile = fileToRead;
					
					// Check for the various File API support.
					if (window.FileReader) {
						// FileReader are supported.
						var reader = new FileReader();
						
						// Handle errors load
						reader.onload = function(event){
							var csvItemsList = [];
							var csv = event.target.result;
							var allTextLines = csv.split(/\r\n|\n/);
							while (allTextLines.length) {
								csvItemsList.push(allTextLines.shift().split(','));
							}
							
							console.log(csvItemsList);
							$scope.csvItems = csvItemsList;
						};
						
						reader.onerror = function(event){
							if (event.target.error.name == "NotReadableError") {
								alert("Canno't read file!");
							}
						};
						
						// Read file into memory as UTF-8
						reader.readAsText(fileToRead);
						
					} else {
						alert('FileReader are not supported in this browser.');
					}
					
				}
			});
		});
	};

	return {
		restrict : 'A',
		link : linker
	};

});