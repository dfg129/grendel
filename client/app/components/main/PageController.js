angular.module('app')
.controller('PageController', function ($scope, $log, $timeout, PageService) {

  $scope.currentPage = 1;
  $scope.totalItems  = 40;

/*
 PageService.count(function(data) {
     $scope.totalItems = data;
  });
*/

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    PageService.changePage($scope.currentPage);
  };
})
.service("PageService", function($rootScope, $http) {
    var pageService = {};
    pageService.page = 1;

    pageService.changePage = function(page) {
      pageService.page = page;
      $rootScope.$broadcast("pageChange");
    };

    pageService.count = function(cb) {
        $http.get('/count')
        .success(function(data) {
          cb(data);
        })
        .error(function() {
          console.log("error in data");
        });
      };
    return pageService;
});
