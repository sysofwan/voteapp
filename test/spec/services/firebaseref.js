'use strict';

describe('Service: firebaseref', function () {

  // load the service's module
  beforeEach(module('voteappApp'));

  // instantiate service
  var firebaseref;
  beforeEach(inject(function (_firebaseref_) {
    firebaseref = _firebaseref_;
  }));

  it('should do something', function () {
    expect(!!firebaseref).toBe(true);
  });

});
