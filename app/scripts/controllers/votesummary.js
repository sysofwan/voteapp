'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:VotesummaryCtrl
 * @description
 * # VotesummaryCtrl
 * Controller of the voteappApp
 */
angular.module('voteappApp')
  .controller('VotesummaryCtrl', function($scope, $routeParams, voteService) {
    
    var voteSession = voteService($routeParams.sessionId);

    voteSession.sessionExists().then(function(exists) {
      if(!exists) {
        voteSession.createSession();
      }
      voteSession.onVoteResultsChanged(function(results) {
        console.log(results);
      });
    });
  });