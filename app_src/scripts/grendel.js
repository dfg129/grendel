// declare module

var appModule = angular.module('appModule', ['ui.router']);

appModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "./partials/main.html"
    })
    .state('state1', {
      url: "/state1",
      templateUrl: "./partials/state1.html",
      controller: 'State1Controller'
    })
    .state('state1.list', {
      url:"/list",
      templateUrl:"./partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "./partials/state2.html",
      controller: 'State2Controller'
    })
    .state('state2.list', {
      url:"/list",
      templateUrl:"./partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    })
    .state('state3', {
      url: "/state3",
      templateUrl: "./partials/state3.html",
      controller: 'State3Controller'
    })
    .state('state3.list', {
      url:"/list",
      templateUrl:"./partials/state3.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    })

    $urlRouterProvider.otherwise('/')
  });
