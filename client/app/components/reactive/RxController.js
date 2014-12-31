angular.module('appModule')
  .controller('RxController', ['$scope', '$rxService', 'rx', function($scope, $rxService, rx) {
    this.title = 'Here in the Western World';
    this.searchtext = null;

    var requestUrl = 'localhost:9999';
    var requestStream = rx.Observable.just(requestUrl);

    var checkConnection = function() {
      if(!$rxService.isConnected) {
          console.log("Warning! Websocket connection not obtained ...");
      }
    };

    this.send = function() {
      $rxService.send(this.searchtext);
    };

    var listen = function() {
     $rxService.listen(function(msg) { return true; }, function(msg) {
       console.log("###Listening " + JSON.stringify(msg));
     });
   };

  //  var responseStream = requestStream
  //  .flatMap(function(requestUrl) {
  //    return rx.Observable.fromPromise($http.get(requestUrl));
  //  });

  ////  responseStream.subscribe(function(response) {
  //    console.log("here now");
///    });
  }]);
