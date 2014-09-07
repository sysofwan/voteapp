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
      $location.path('/').search('error', 'vote session does not exist');
      return;
    }

    voteSession.onVoteResultsChanged(function() {
      if (voteSession.sessionStopped()) {
        $location.path('/').search('error', 'vote session stopped');
        return;
      }

      $scope.voteNode = voteSession.getChoices();
      $scope.onVote = function(choice) {
        voteSession.addVote(choice);
        $scope.curChoice = choice;
      };

    });
  });

});