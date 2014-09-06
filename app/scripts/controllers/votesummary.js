'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:VotesummaryCtrl
 * @description
 * # VotesummaryCtrl
 * Controller of the voteappApp
 */

angular.module('voteappApp')
  .controller('VotesummaryCtrl', function($scope, $routeParams, voteService, _, $interval) {

    var ticks,
      voteSession = voteService($routeParams.sessionId),
      timer = 0;

    $scope.timer = '0:00';

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

        $scope.voteCount = _.reduce(results, function(memo, arr) {
          return memo + arr[1];
        }, 0);

      });

      $interval(function() {
        timer += 1;
        var sec = timer % 60;
        var secStr = sec < 10 ? '0' + sec : sec;
        var minute = Math.floor(timer/60);
        $scope.timer = minute + ':' + secStr;
      }, 1000);
    });

  });