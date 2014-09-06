'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:UservoteCtrl
 * @description
 * # UservoteCtrl
 * Controller of the voteappApp
 */
angular.module('voteappApp')
  .controller('UservoteCtrl', function ($scope, firebaseref, $firebase, $routeParams, $location, user) {
    var sessionId = $routeParams.sessionId;
    var childName = 'voteSessions/' + sessionId;
    var sessionNode = firebaseref.child(childName);

    sessionNode.once('value', function(data) {
      if (!data.val()) {
        $location.url('/');
      }
      
      $scope.onVote = function(vote) {
        $scope.vote = vote;
        var obj = {};
        obj[user.name] = vote;
        sessionNode.update(obj);        
      };     
    });




  });
