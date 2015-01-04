angular.module('app')
  .controller('LoginController', function($window, $scope, $http, $location, AuthorizationService ) {
     this.data = {
       username: '',
       password: ''
     }; // credentials to be passed in

    this.login = function(data) {
        AuthorizationService.login(data).then(function(user) {
          $location.path('/summary');
          $window.location.href = '/summary';
      });
   };

    this.setCurrent = function(user) {
        this.user = user;
      };
  });
