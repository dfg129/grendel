angular.module('app')
.controller('PageController', function ($scope, $log, $timeout, PageService) {

  $scope.currentPage = 1;
  $scope.totalItems  = 40;

/* timing issue here - need to move logic to app startup
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
});
