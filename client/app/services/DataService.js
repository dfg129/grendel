
angular.module('app')
  .service("DataService", function($http, PageService) {
    var dataService = {};
    dataService.data = {};
    var page = PageService.page;

    dataService.getData = function(page, cb) {
      $http.get('/instances?page=' + page + '&size=' + 10)
      .success(function(data) {
        cb(data);
      })
      .error(function() {
        console.log("error in data");
      });
    };
    return dataService;
  });
