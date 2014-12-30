angular.module('appModule')
.service('$rxService', ['$q', '$rootScope', function($q, $rootScope) {
  var connection = function() {
    var sc = {};
    var listeners = [];
    var websocketUrl = 'ws://localhost:9999/echo';

    sc.isConnected = false;

    $rootScope.queuedMessages = [];

    sc.listen = function(predicate, handler) {
      listeners.push({p: predicate, h: handler});
    };

    sc.listenOnce = function(predicate) {
      var deferred = $q.defer();
      deferred.done = false;

      var listener = {d: deferred, p: predicate};
      listeners.push(listener);

      var promise = deferred.promise;
      promise.then(function(data) {
        deferred.done = true;
      });

      return promise;
    };

    var onOpen = function() {
      console.log('Opening ...');
      $rootScope.websocketAvailable = true;
      sc.isConnected = true;
      $scope.$apply(function() {
        if($rootScope.queueMessages) {
          for(var i=0; i<$rootScope.queuedMessages.length; i++) {
            ws.send(JSON.stringify($rootScope.queuedMessages[i]));
          }
          $rootScope.queuedMessages = null;
        }
      });
    };

    var onClose = function() {
      console.log('Closing ...');
      sc.isConnected = false;
      $rootScope.websocketAvailable = false;
      $rootScope.apply(
        $rootScope.queuedMessages = $rootScope.queuedMessages || []
      );
    };

    var onMessage = function() {
      var obj = JSON.parse(msg.data);

      for(var i=0; i<listeners.length; i++) {
        var listener = oneListeners[i];
        if(listener.p(obj)) {
          listener.h(obj);
        }

        var remove = [];

        if(listener.p(obj)) {
          var o = obj;
          listener.d.resolve(o);
          remover.push(listener);
        }

        for(var j=0; j<remove.length; j++) {
          oneListeners.removeOne(remove[j]);
        }
      }
    };

      var onError = function() {
        console.log('onError');
      };

      sc.send = function(obj) {
        ws.send(JSON.stringify(obj));
      };

      var setHandlers = function(w) {
        w.onOpen = onOpen;
        w.onClose = onClose;
        w.onMessage = onMessage;
        w.onError = onError;
      };

      var connect = function() {
        console.log('connecting ...');
        var w = new WebSocket(websocketUrl);
        setHandlers(w);
        return w;
      };

      var ws = connect();

      return sc;
    };

    return connection();
  }]);
