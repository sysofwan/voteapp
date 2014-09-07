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
      voteSession = voteService($routeParams.sessionId);

    $scope.timer = '-:--';

    voteSession.sessionExists().then(function(exists) {
      if (!exists) {
        voteSession.createSession();
      }
      voteSession.onGraphDataChanged(function(results) {

        $scope.nodeData = voteSession.getSessionSummary();
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
        		tickDecimals: 0,
            tickLength: 0
        	},
          xaxis: {
            ticks: ticks,
            min: 0.3,
            tickLength:0,
            max:4.7,
            tickSize:1.5
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
            noColumns: 4,
            position: 'nw',
            margin: 20,
            labelFormatter: function labelFormatter(label) {
    return "<div style='font-size:15pt;'>" + label + "</div>";
            }
          }
        };


        $scope.voteCount = _.reduce(results, function(memo, arr) {
          return memo + arr[1];
        }, 0);

        $scope.stopSession = voteSession.stopSession;
        $scope.sessionStopped = voteService.sessionStopped;

      });

      $interval(function() {
        var timer = voteSession.getSecondsLive();
        var sec = timer % 60;
        var secStr = sec < 10 ? '0' + sec : sec;
        var minute = Math.floor(timer/60);
        $scope.timer = minute + ':' + secStr;
      }, 1000);
    });

  });