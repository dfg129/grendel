// declare module

angular.module('appModule')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: "/main",
    templateUrl: "./html/main/main.html"
  })
  .state('reactive', {
    url: "/reactive",
    templateUrl: "./html/reactive/reactive-main.html",
    controller: 'RxJsController'
  })
  .state('state1.list', {
    url:"/list",
    templateUrl:"./html/state1/state1.list.html",
    controller: function($scope) {
      $scope.items = ["A", "List", "Of", "Items"];
    }
  })
  .state('state2', {
    url: "/state2",
    templateUrl: "./html/state2/state2.html",
    controller: 'State2Controller'
  })
  .state('state2.list', {
    url:"/list",
    templateUrl:"./html/state2/state2.list.html",
    controller: function($scope) {
      $scope.things = ["A", "Set", "Of", "Things"];
    }
  })
  .state('state3', {
    url: "/state3",
    templateUrl: "./html/state3/state3.html",
    controller: 'State3Controller'
  })
  .state('state3.list', {
    url:"/list",
    templateUrl:"./html/state3/state3.list.html",
    controller: function($scope) {
      $scope.things = ["A", "Set", "Of", "Things"];
    }
  });

    $urlRouterProvider.otherwise('/');
  });
