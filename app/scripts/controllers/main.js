'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the voteappApp
 */
angular.module('voteappApp')
  .controller('MainCtrl', function($scope, $location) {
  	$scope.go = function(path) {
      console.log($scope.sessionId);
  		$location.path(path + $scope.sessionId);
  	};
  	
  });