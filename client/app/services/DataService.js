
/**
 * Make a REST call to get a page of machine instances. Pass the page start index
 * and the number of instances to be returned. This should be coordinated with the
 * the tables size in the UI.
 */
angular.module('app')
  .service("DataService", function($http, $log, PageService) {
    var dataService = {};

    // PageService tracks the requested page
    var page = PageService.page;

    // send a start page based on next page start and size
    dataService.getData = function(page, cb) {
      $http.get('/instances?page=' + page + '&size=' + PageService.pageSize)
      .success(function(data) {
        cb(data);
      })
      .error(function(err) {
        // log here or display a warning
        $log.log("error in data");
      });
    };
    return dataService;
  });
