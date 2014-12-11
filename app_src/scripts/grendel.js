// declare module

var appModule = angular.module('grendel', []);

appModule.filter('greet', function() {
  return function(name) {
    return 'This is my ' + name;
  };
});
