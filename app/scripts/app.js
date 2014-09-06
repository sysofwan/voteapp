'use strict';

/**
 * @ngdoc overview
 * @name voteappApp
 * @description
 * # voteappApp
 *
 * Main module of the application.
 */
angular
  .module('voteappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/summary/:sessionId', {
        templateUrl: 'views/votesummary.html',
        controller: 'VotesummaryCtrl'
      })
      .when('/vote/:sessionId', {
        templateUrl: 'views/uservote.html',
        controller: 'UservoteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .constant('_', window._);
