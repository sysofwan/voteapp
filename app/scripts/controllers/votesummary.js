'use strict';

/**
 * @ngdoc function
 * @name voteappApp.controller:VotesummaryCtrl
 * @description
 * # VotesummaryCtrl
 * Controller of the voteappApp
 */

angular.module('voteappApp')
  .controller('VotesummaryCtrl', function($scope, $routeParams, voteService) {

    var voteSession = voteService($routeParams.sessionId);

    voteSession.sessionExists().then(function(exists) {
      if (!exists) {
        voteSession.createSession();
      }
      voteSession.onVoteResultsChanged(function(results) {
        console.log(results);
      });
    });

    var data = $scope.myData = [

      {
        label: 'A',
        data: [
          [1, 1]
        ]
      }, {
        label: 'B',
        data: [
          [2, 3]
        ]
      }, {
        label: 'C',
        data: [
          [3, 4]
        ]
      }, {
        label: 'D',
        data: [
          [4, 6]
        ]
      }
    ];
    $scope.myChartOptions = {
      xaxis: {
        ticks: [
          [1, data[0].label],
          [2, data[1].label],
          [3, data[2].label],
          [4, data[3].label]
        ]
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