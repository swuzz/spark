function DecksController($scope, $http) {
	$http.get('/user').success(function(data) {
		$scope.name = data.name;
		$scope.numDecks = data.numDecks;
	});
}

function DecksCreateController($scope, $http, $filter) {
	// set up initial state for models
	$scope.allCards = []; // the list of all cards
	$scope.deckCards = []; // the list of cards in the deck
	$scope.deckName = ''; // the name of the deck
	$scope.selectedCard = null; // the card object that has been selected
	$scope.filteredCards = []; // the list of cards filtered by the query
	$scope.selectedDeckItem = null; // the selected item in the deck list

	// get the list of cards in json
	$http.get('/cards/cards.json').success(function(data) {
		$scope.allCards = data;
		$scope.filterCards();
	});
	
	// filter the list of all cards by the query
	$scope.filterCards = function() {
		$scope.filteredCards = $filter('cardNameFilter')($scope.allCards, $scope.query);
		$scope.selectedCard = $scope.filteredCards[0];
	};
	
	/*
	$scope.$watch('selectedDeckItem', function(value) {
		if (value.card) {
			$scope.selectedCard = value.card;
		}
	});*/
	$scope.pushCard = function() {
		if ($scope.selectedCard) {
			$scope.deckCards.push($scope.selectedCard);
			$scope.selectedDeckCard = $scope.selectedCard;
		}
	};
}

function PlayController($scope) {
  console.log('this is from inside playcontroller');
}