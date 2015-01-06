
/*
 * Controller for the summary page. This controller accesses an open source angularjs
 * table implementation located at http://ui-grid.info/
 */
angular.module('app')
  .controller("MainController", function($scope, $http, $timeout, DataService, PageService) {

    // set the options for the table
    $scope.gridOptions = gridOptions = {
        multiSelect: true,
        enableRowSelection: true,
        enableSelectAll: true,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: true,
        rowHeight: 24
      };

    // set the column definitions
    var columnDefs = [
        {field: "name", name: "Name"},
        {field: "id", name: "Instance ID"},
        {field: "itype", name: "Instance Type"},
        {field: "state", name: "Instance State"},
        {field: "az", name: "Availability Zone"},
        {field: "publicIP", name: "Public IP"},
        {field: "privateIP", name: "Private IP"}
    ];

    // set the grid options
    $timeout( function() {
      $scope.gridOptions = gridOptions;
    }, 100);

    // set the column definitions
    $timeout( function() {
      $scope.gridOptions.columnDefs = columnDefs;
    }, 100);

    /**
     * Notify the grid when the data changes
     */
    var pageChange = function() {
       DataService.getData(PageService.page, function(data) {
         $scope.gridOptions.data = data;
       });
     };

     // watch for broadcasts of pageChange events
     $scope.$on("pageChange", pageChange);

     // initial page setting
     $timeout(function() {
       pageChange();
     }, 100);
  });
