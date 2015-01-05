
  app = angular.module('app',  ['ui.grid', 'ui.bootstrap'])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
    }]);
  /*  .run(function(paginationConfig) {
      var total = paginationConfig.
      timeout(PageService.count(function(data) {
        $scope.totalItems = data;
      }), 1000);
    })
*/
