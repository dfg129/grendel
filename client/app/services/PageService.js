
/**
 * Handle pagination calls to get groups of machine instances
 */
angular.module('app')
 .service("PageService", function($rootScope, $log, $http) {
   var pageService = {};
   // default start page
   pageService.page = 1;
   // number of instances retrieved - coordinate with table size
   pageService.pageSize = 10;

   /**
    * Change to the next requested page
    * @param page requested
    */
   pageService.changePage = function(page) {
     pageService.page = page;
     $rootScope.$broadcast("pageChange");
   };

   /**
    * Get the total number of instances
    */
   pageService.count = function(cb) {
     $http.get('/count')
     .success(function(data) {
       cb(data);
     })
     .error(function() {
       $log.log("error in data");
     });
   };
   return pageService;
 });
