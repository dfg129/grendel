
  app = angular.module('app',  ['ui.grid', 'ui.bootstrap'])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
    }]);
