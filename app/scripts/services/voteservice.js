'use strict';

/**
 * @ngdoc service
 * @name voteappApp.voteService
 * @description
 * # voteService
 * Factory in the voteappApp.
 */
angular.module('voteappApp')
  .factory('voteService', function(firebaseref, _, $q, $firebase, $rootScope, user, $timeout, Firebase) {
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
            choices: ['A', 'B', 'C', 'D'],
            timestamp: Firebase.ServerValue.TIMESTAMP
          }
        };
        voteNode.update(obj);
      };

      var getSessionSummary = function() {
        return nodeData;
      };

      var computeGraphData = function(nodeData) {
        if (!nodeData.info) {
          return [];
        }
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
        if (nodeData.info.paused) {
          return;
        }

        var obj = {};
        obj[user.getId()] = vote;
        sessionNode.child('votes').update(obj);
      };

      var pauseSession = function() {
        if (!nodeData.info.paused) {
          nodeData.info.paused = true;
          nodeData.info.pausedTime = new Date().getTime();
          nodeData.$save();
        }
      };

      var sessionPaused = function() {
        if (nodeData.info) {
          return nodeData.info.paused;  
        }
        return false;
      };

      var getSecondsLive = function() {
        var created = nodeData.info.timestamp,
            time;
        if (sessionPaused()) {
          time = nodeData.info.pausedTime;
        } else {
          time = new Date().getTime();
        }

        var millsSinceCreated = time - created < 0 ? 0 : time - created;
        return Math.floor(millsSinceCreated/1000);
      };

      var getChoices = function() {
        if (nodeData.info) {
          return nodeData.info.choices;
        }
        return [];
      };

      var resumeSession = function() {
        if (nodeData.info.paused) {
          nodeData.info.paused = false;
          nodeData.info.timestamp += new Date().getTime() - nodeData.info.pausedTime;
          nodeData.$save();
        }
      };

      var resetSession = function() {
        nodeData.votes = 0;
        nodeData.info.timestamp = 0;
        nodeData.info.pausedTime = 0;
        nodeData.$save();
      };

      var deleteSession = function() {
        sync.$remove();
      };

      var getUserVote = function() {
        return nodeData.votes[user.getId()];
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
        pauseSession: pauseSession,
        getSecondsLive: getSecondsLive,
        sessionPaused: sessionPaused,
        getChoices: getChoices,
        resumeSession: resumeSession,
        resetSession: resetSession,
        deleteSession: deleteSession,
        getUserVote: getUserVote
      };
    };
  });