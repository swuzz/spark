angular.module('filters', [])
  .filter('cardNameFilter', function() {
  	return function(cards, query) {
  		if (!cards) {
  			return cards;
  		}
  		if (!query) {
  			query = '';
  		}
  		var arrayToReturn = [];
  		var maxLength = 15;
  		var totalCards = cards.length;
		for (var i = 0; i < totalCards && arrayToReturn.length < maxLength; i++){
			var cardNameLower = cards[i]['name'].toLowerCase();
			var queryLower = query.toLowerCase();
			if (cardNameLower.indexOf(queryLower) !== -1) {
				arrayToReturn.push(cards[i]);
			}
		}
		if (arrayToReturn && arrayToReturn.length > 0){
			selectedCard = arrayToReturn[0];
		}
		return arrayToReturn;
  	};
  })
  .filter('byType', function() {
  	return function(cards, type) {
  		var arrayToReturn = [];
  		for (var i = 0; i < cards.length; i++) {
  			if (cards[i].cardType.toLowerCase().indexOf(type) > -1) {
  				arrayToReturn.push(cards[i]);
  			}
  		}
  		return arrayToReturn;
  	};
  })
  .filter('deckCardsToItems', function() {
  	return function(cards) {
  		if (!cards) {
  			return cards;
  		}
  		return [{name:'Total', count:0}];
  		var arrayToReturn = [];
  		arrayToReturn.push({name: 'Total', count: cards.length});/*
  		cards = cards.sort(function(carda, cardb) {
  			return carda.name > cardb.name ? 1 : -1;
  		});
  		var i = 0;
  		var deckItem = {};
		while (i < cards.length){
			var card = cards[i];
			var cardName = card.name;
			deckItem.name = cardName;
			var count = 0;
			while(i < cards.length && cardName == cards[i].name) {
				count++;
				i++
			}
			deckItem.count = count;
			deckItem.card = card;
			arrayToReturn.push(deckItem);
		}*/
		return arrayToReturn;
  	};
  });;