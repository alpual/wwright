'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.works',
  'myApp.pageslide',
  'myApp.tilehex',
  'myApp.version',
  'ngAnimate'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  otherwise({
  	redirectTo: '/view1'
  });
}]);



