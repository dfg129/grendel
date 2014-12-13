// declare module

var appModule = angular.module('grendel', ['ui-router']);

appModule.config(function($stateProvider, $urlRouteProvider) {
  $stateProvider
    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html'
    })
    .state('settings.profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      controller: 'ProfileController'
    })
    .state('settings.accoutn', {
      url: '/account',
      templateUrl: 'templates/account.html'
      contrller: 'AccountController'
    });
    $urlRouteProvider.otherwise('/settings/profile');
});
