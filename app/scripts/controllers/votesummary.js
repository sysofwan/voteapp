'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:VotesummaryCtrl
 * @description
 * # VotesummaryCtrl
 * Controller of the voteappApp
 */

angular.module('voteappApp')
  .controller('VotesummaryCtrl', function($scope, $routeParams, voteService, _) {

    var ticks,
      voteSession = voteService($routeParams.sessionId);

    voteSession.sessionExists().then(function(exists) {
      if (!exists) {
        voteSession.createSession();
      }
      voteSession.onGraphDataChanged(function(results) {
        $scope.myData = _.map(results, function(arr, index) {
          return {
            label: arr[0],
            data: [
              [index + 1, arr[1]]
            ]
          };
        });

        ticks = _.map(results, function(arr, index) {
          return [index + 1, arr[0]];
        });

        $scope.voteCount = _.reduce(results, function(memo, arr) {
          return memo + arr[1];
        }, 0);

        console.log($scope.voteCount);

        $scope.myChartOptions = {
        	yaxis: {
        		min: 0,
        		tickDecimals: 0
        	},
          xaxis: {
            ticks: ticks
          },
          bars: {
            show: true,
            align: 'center',
            barWidth: 0.3
          },
          grid: {
            hoverable: true
          },
          tooltip: true,
          tooltipOpts: {
            content: '%y'
          },
          legend: {
            show: true,
            nocolumns: 0,
            position: 'nw'

          }
        };
      });
    });

  });