'use strict';

describe('Service: libs', function () {

  // load the service's module
  beforeEach(module('voteappApp'));

  // instantiate service
  var libs;
  beforeEach(inject(function (_libs_) {
    libs = _libs_;
  }));

  it('should do something', function () {
    expect(!!libs).toBe(true);
  });

});
