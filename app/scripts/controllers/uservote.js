'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:UservoteCtrl
 * @description
 * # UservoteCtrl
 * Controller of the voteappApp
 */
angular.module('voteappApp')
  .controller('UservoteCtrl', function($scope, $routeParams, $location, voteService) {
    var voteSession = voteService($routeParams.sessionId);


    voteSession.sessionExists().then(function(exists) {
      if (!exists) {
        $location.path('/');
      }
      $scope.voteNode = voteSession.getChoices();
      $scope.onVote = voteSession.addVote;
    });

  });