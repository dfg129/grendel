angular.module('app')
.controller('PageController', function ($scope, $log, PageService) {
  $scope.totalItems = 64;
  $scope.currentPage = 1;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
    PageService.changePage($scope.currentPage);
  };
})
.service("PageService", function($rootScope) {
    var pageService = {};
    pageService.page = 1;

    pageService.changePage = function(page) {
      pageService.page = page;
      $rootScope.$broadcast("pageChange");
    };

    return pageService;
});
