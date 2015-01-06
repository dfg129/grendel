
/**
 * Service to login into server. Sends a request of username and password. All actual
 * authentication and validation occur on the server. Session service is intended to track
 * client side authorizations i.e. grey out or hide features not allowed access to
 * - in this demo it's currently not implemented
 */
angular.module("app").service('AuthorizationService', function($http, $log, Session) {
  service = {};

  service.login = function(data) {
    return $http
    .post('/login', data)
    .success(function(result) {
       Session.create(result.data.sessionId, result.data.userId, result.data.userName);
    })
    .error(function(err) {
      // log failures if desired or pass a function to generate a warning to the user
      $log.log(err);
    });
  };

  return service;
});
