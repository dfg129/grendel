console.log("here is the main");

angular.module('app')
  .controller("MainController", function($http) {
    this.look = " see me ";
    var idata = {};
    this.data = [
   {
     "firstname": "julie",
     "lastname": "jolin"
     }
    ]

     this.getData = function() {
       $http.get('/instances')
        .success(function(data) {
           idata = data;
        })
        .error(function() {
          console.log("error in data");
        });
     };

    this.getData();
  });
