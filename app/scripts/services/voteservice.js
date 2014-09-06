'use strict';

/**
 * @ngdoc service
 * @name voteappApp.voteService
 * @description
 * # voteService
 * Factory in the voteappApp.
 */
angular.module('voteappApp')
  .factory('voteService', function(firebaseref, _, $q, $firebase, $rootScope, user, $timeout) {
    return function(sessionId) {

      var childName = 'voteSessions/' + sessionId;
      var sessionNode = firebaseref.child(childName);
      var sync = $firebase(sessionNode);
      var voteChangeCallback = angular.noop;
      var graphDataChangedCallback = angular.noop;
      var nodeData = sync.$asObject();

      var sessionExists = function() {
        var deferred = $q.defer();
        sessionNode.once('value', function(data) {
          if (data.val() === null) {
            deferred.resolve(false);
          }
          deferred.resolve(true);
        }, function(error) {
          deferred.reject(error);
        });
        return deferred.promise;
      };

      var createSession = function() {
        var voteNode = firebaseref.child('voteSessions');
        var obj = {};
        obj[sessionId] = {
          info: {
            choices: ['A', 'B', 'C', 'D']
          }
        };
        voteNode.update(obj);
      };

      var getSessionSummary = function() {
        return nodeData;
      };

      var computeGraphData = function(nodeData) {
        var grouped = _.map(nodeData.info.choices, function(key) {
          var count = 0;
          if (nodeData.votes) {
            count = _.reduce(nodeData.votes, function(memo, vote) {
              return vote === key ? memo + 1 : memo;
            }, 0);
          }
          return [key, count];
        });
        return _.sortBy(grouped, function(arr) {
          return arr[0];
        });
      };

      nodeData.$watch(function() {
        $timeout(function() {
          var graphData = computeGraphData(nodeData);
          voteChangeCallback(nodeData);
          graphDataChangedCallback(graphData);
        });
      });

      var addVote = function(vote) {
        if (nodeData.info.stopped) {
          return;
        }
        var obj = {};
        obj[user.getId()] = vote;
        sessionNode.child('votes').update(obj);
      };

      var stopSession = function() {
        nodeData.info.stopped = true;
        nodeData.$save();
      };

      return {
        sessionExists: sessionExists,
        createSession: createSession,
        getSessionSummary: getSessionSummary,
        onVoteResultsChanged: function(callback) {
          voteChangeCallback = callback;
        },
        onGraphDataChanged: function(callback) {
          graphDataChangedCallback = callback;
        },
        addVote: addVote,
        stopSession: stopSession
      };
    };
  });