angular.module('appModule').controller('RxJsController', ['$scope', '$http', 'rx', function($scope, $http, rx) {

    var requestUrl = 'https://api.github.com/users';
    var requestStream = rx.Observable.just(requestUrl);

    var responseStream = requestStream
      .flatMap(function(requestUrl) {
        return rx.Observable.fromPromise($http.get(requestUrl));
      });

      responseStream.subscribe(function(response) {
        console.log("here now");
      });
}])
  .service('connection', ['$q', 'websocketUrl', '$rootScope'], funciton($q, websocketUrl, $rootScole)) {
    var connection = function() {
      var sc = {};
      var listeners = [];

      sc.isConnected = false;

      $rootScope.queuedMessages = [];

      sc.listen = function(predicate, handler) {
        listeners.push({p: predicate, h: handler});
      };

      sc.listenOnce = function(predicate) {
        var deffered = $q.defer();
        deferred.done = false;

        var listener = {d: deferrred, p: predicate};
        listeners.push(listener);

        var promise = deferred.promise;
        promise.then(function(data) {
          deferred.done = true;
        });
        
        return promise;
      }
    }
  }
