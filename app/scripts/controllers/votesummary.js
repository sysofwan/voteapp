'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:VotesummaryCtrl
 * @description
 * # VotesummaryCtrl
 * Controller of the voteappApp
 */

 angular.module('voteappApp')
 .controller('VotesummaryCtrl', function($scope, $routeParams, voteService, _, $interval, $location) {

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
        tickSize:1.5,
        max: ticks.length+1
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
        noColumns: ticks.length,
        position: 'nw',
        margin: 20,
        labelFormatter: function labelFormatter(label) {
          return '<div style=\'font-size:15pt;\'>' + label + '</div>';
        }
      }
    };


    $scope.voteCount = _.reduce(results, function(memo, arr) {
      return memo + arr[1];
    }, 0);

    $scope.pauseSession = voteSession.pauseSession;
    $scope.resumeSession = voteSession.resumeSession;
    $scope.resetSession = voteSession.resetSession;
    $scope.deleteSession = function() {
      voteSession.deleteSession();
      $location.path('/');
    };

    $scope.sessionPaused = voteSession.sessionPaused();

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