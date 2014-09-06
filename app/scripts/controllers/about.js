'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the voteappApp
 */
angular.module('voteappApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
