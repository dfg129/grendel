 
  app = angular.module('app',  ['ui.grid'])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
    }]);
