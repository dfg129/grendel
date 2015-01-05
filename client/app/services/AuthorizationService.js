angular.module("app").service('AuthorizationService', function($http, Session) {
  service = {};

  service.login = function(data) {
    return $http
    .post('/login', data)
    .then(function(result) {
      Session.create(result.data.sessionId, result.data.userId, result.data.userName);
      return result.data;
    });
  };

  service.isAuthenticated = function() {
    return !!Session.userId;
  };

  return service;
});
