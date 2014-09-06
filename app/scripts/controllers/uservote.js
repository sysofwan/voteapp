'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:UservoteCtrl
 * @description
 * # UservoteCtrl
 * Controller of the voteappApp
 */
angular.module('voteappApp')
  .controller('UservoteCtrl', function($scope, firebaseref, $routeParams, $location, user) {
    var sessionId = $routeParams.sessionId;
    var childName = 'voteSessions/' + sessionId;
    var sessionNode = firebaseref.child(childName);

    sessionNode.once('value', function(data) {
      $scope.$apply(function() {
        console.log(data.val());
        if (data.val() === null) {
          $location.path('/');
        }

        $scope.onVote = function(vote) {
          $scope.vote = vote;
          var obj = {};
          obj[user.getId()] = vote;
          sessionNode.update(obj);
        };
      }, function(error) {
        console.log(error);
      });
    });



  });