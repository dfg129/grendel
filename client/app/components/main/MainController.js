
angular.module('app')
  .controller("MainController", function($scope, $http, $timeout, DataService, PageService) {

    $scope.gridOptions = gridOptions = {
        multiSelect: true,
        enableRowSelection: true,
        enableSelectAll: true,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: true,
        rowHeight: 24
      };

    var columnDefs = [
      {field: "name", name: "Name"},
    {field: "id", name: "Instance ID"},
  {field: "itype", name: "Instance Type"},
{field: "state", name: "Instance State"},
      {field: "az", name: "Availability Zone"},
    {field: "publicIP", name: "Public IP"},
  {field: "privateIP", name: "Private IP"}
    ];

    $timeout( function() {
      $scope.gridOptions = gridOptions;
    }, 100);

    $timeout( function() {
      $scope.gridOptions.columnDefs = columnDefs;
    }, 100);

    var pageChange = function() {
       DataService.getData(PageService.page, function(data) {
         $scope.gridOptions.data = data;
       });
     };

     $scope.$on("pageChange", pageChange);

     $timeout(function() {
       pageChange();
     }, 100);
  });
