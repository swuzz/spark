angular.module('spark', ['filters', 'directives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/decks', {templateUrl: 'partials/decks.html',   controller: DecksController}).
      when('/decksCreate', {templateUrl: 'partials/decksCreate.html',   controller: DecksCreateController}).
      when('/decks/:id', {templateUrl: 'partials/decksDetail.html',   controller: DecksController}).
      when('/play', {templateUrl: 'partials/play.html', controller: PlayController}).
      otherwise({redirectTo: '/decks'});
  }]);