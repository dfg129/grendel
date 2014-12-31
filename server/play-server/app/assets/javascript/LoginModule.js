angular.module('LoginModule', [])
  .controller('LoginController', function($scope, $http) {
     var data = {
       username: '',
       password: ''
     } // credentials to be passed in

    this.login = function(data) {
        AuthorizationService.login(data).then(function(user) {
          $scope.setCurrent(user);
        }, function() {
          console.login("login failed");
        })
    }
  })
  .service('AuthorizationService', function($http, Session) {
    service = {};

    service.login = function(data) {
      return $http
        .post('/login', data)
        .then(function(result) {
          Session.create(result.data.sessionId, result.data.userId, result.data.userName)
          return result.data;
        });
    };

    service.isAuthenticated = function() {
      return !!Session.userId
    };

    return service;
  })
  .service('Session', function() {
    this.create(function(sessionId, userId, userName) {
      this.id = sessionId;
      this.userId = userId;
      this.userName = userName;
    })
  })
