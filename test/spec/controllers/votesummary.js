'use strict';

describe('Controller: VotesummaryCtrl', function () {

  // load the controller's module
  beforeEach(module('voteappApp'));

  var VotesummaryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VotesummaryCtrl = $controller('VotesummaryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
