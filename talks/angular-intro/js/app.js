
// Define the app module
angular.module('presentationApp', ['presentationApp.directives']);

// Filters, services and directives can then be added

function presentationCtrl($scope) {
	// Define any models or scope-specific functions here

	$scope.model = {
		listItems: ['Item one',
					'Item two',
					'Banana']
	};

}
presentationCtrl.$inject = ['$scope'];

angular.module('presentationApp.directives', []).
	directive('markdown', function() {
		var converter = new Showdown.converter();
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('blur keyup change', function() {
					var htmlText = converter.makeHtml(element.val());
					$('.preview').html(htmlText);
				});
			}
		}
	});