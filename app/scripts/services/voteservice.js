'use strict';

/**
 * @ngdoc service
 * @name voteappApp.voteService
 * @description
 * # voteService
 * Factory in the voteappApp.
 */
angular.module('voteappApp')
  .factory('voteService', function(firebaseref, _, $q, $firebase, $rootScope, user) {
    return function(sessionId) {

      var childName = 'voteSessions/' + sessionId;
      var sessionNode = firebaseref.child(childName);
      var sync = $firebase(sessionNode);
      var voteChangeCallback = angular.noop;
      var voteResults = sync.$asObject();

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
        obj[sessionId] = 0;
        voteNode.update(obj);
      };

      var getSessionSummary = function() {
        return voteResults;
      };

      var computeGraphData = function(voteResults) {
        var filtered = _.reject(voteResults, function(value, key) {
          console.log(_.isString(key));
          return !key.indexOf('$');
        });
        var grouped = _.groupBy(filtered, function(choice) {
          return choice;
        });
        return _.map(grouped, function(value, key) {
          var obj = {};
          obj[key] = value.length;
          return obj;
        });
      };

      voteResults.$watch(function() {
        $rootScope.$apply(function() {
          voteChangeCallback(voteResults);
        });
        console.log(computeGraphData(voteResults));
      });

      var addVote = function(vote) {
        var obj = {};
        obj[user.getId()] = vote;
        sessionNode.update(obj);
      };

      

      return {
        sessionExists: sessionExists,
        createSession: createSession,
        getSessionSummary: getSessionSummary,
        onVoteResultsChanged: function(callback) {
          voteChangeCallback = callback;
        },
        addVote: addVote
      };
    };
  });