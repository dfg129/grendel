
/*
 * Contoller to log a user in. This is visible the authenticate page.
 */
angular.module('app')
  .controller('LoginController', function($window, $scope, $http, $location, AuthorizationService ) {
    // call the authentication service to request login
    this.login = function(data) {
        AuthorizationService.login(data).then(function(user) {
          // if sucessful then set to summary page
          $location.path('/summary');
          $window.location.href = '/summary';
      });
       // TODO handle login failure -maybe warning depending on security level
   };
});
