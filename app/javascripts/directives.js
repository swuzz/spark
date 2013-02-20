angular.module('directives', [])
	.directive('onEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
            	// ENTER
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.onEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
    .directive('copyArrowPresses', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                var filteredCards = $('#filteredCards');
                var curr = parseInt(filteredCards.val());
            	// ARROW UP
                if (event.which === 38) {
                	if (curr > 0) {
                    	scope.selectedCard = scope.filteredCards[curr-1];
                    	filteredCards.val(curr-1);
                    }
                }
                // ARROW DOWN
                if (event.which === 40) {
                	if (curr < 14) {
                    	scope.selectedCard = scope.filteredCards[curr+1];
                    	filteredCards.val(curr+1);
                    }
                }
                scope.$apply();
            });
        };
    });