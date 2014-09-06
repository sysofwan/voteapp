'use strict';

/**
 * @ngdoc service
 * @name voteappApp.user
 * @description
 * # user
 * Factory in the voteappApp.
 */
angular.module('voteappApp')
  .factory('user', function ($cookieStore) {

    var uIdKey = 'uId';

    var createUserId = function() {
      var userId = (Math.random() % 1000000000000).toString();
      $cookieStore.put(uIdKey, userId);
      return userId;
    };

    var userId = $cookieStore.get(uIdKey);
    if (!userId) {
      userId = createUserId();
    }

    return {
      getId: function() {
        return userId;
      }
    };

  });
