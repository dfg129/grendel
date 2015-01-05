
angular.module('app')
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
