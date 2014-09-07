'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the voteappApp
 */
angular.module('voteappApp')
  .controller('MainCtrl', function($scope, $location, $routeParams) {
    $scope.error = $routeParams.error;
  	$scope.go = function(path) {
  		$location.url(path + $scope.sessionId);
  	};
  	
  });