
/**
 * Controller to handle pagination . The pagination itself is handled by
 * an open source project - http://angular-ui.github.io/bootstrap/
 */
angular.module('app')
.controller('PageController', function ($scope, $log, $timeout, PageService) {

  $scope.currentPage = 1;
  $scope.totalItems  = 40;

/* timing issue here - need to move logic to app startup
 PageService.count(function(data) {
     $scope.totalItems = data;
  });
*/

  // The incoming page number will become the next page
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  // broadcast a page change event to all listeners
  $scope.pageChanged = function() {
    PageService.changePage($scope.currentPage);
  };
});
