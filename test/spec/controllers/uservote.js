'use strict';

describe('Controller: UservoteCtrl', function () {

  // load the controller's module
  beforeEach(module('voteappApp'));

  var UservoteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UservoteCtrl = $controller('UservoteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
