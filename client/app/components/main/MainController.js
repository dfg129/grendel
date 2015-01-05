
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
      {field: "id", name: "id"},
      {field: "itype", name: "Type"},
      {field: "state", name: "State"},
      {field: "az", name: "Az"},
      {field: "publicIP", name: "Public Address"},
      {field: "privateIP", name: "Private Address"}
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
