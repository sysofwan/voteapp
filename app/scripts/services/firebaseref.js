'use strict';

/**
 * @ngdoc service
 * @name voteappApp.firebaseref
 * @description
 * # firebaseref
 * Factory in the voteappApp.
 */
angular.module('voteappApp').factory('firebaseref', function (Firebase) {
  return new Firebase('https://voteapp.firebaseio.com/');
});
