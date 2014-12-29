angular.module('appModule').controller("RxJsController", ['$scope', '$http', 'rx', function($scope, $http, rx) {

    var requestUrl = 'https://api.github.com/users';
    var requestStream = rx.Observable.just(requestUrl);

    var responseStream = requestStream
      .flatMap(function(requestUrl) {
        return rx.Observable.fromPromise($http.get(requestUrl));
      });

      responseStream.subscribe(function(response) {
        console.log("here now");
      });
}]);
