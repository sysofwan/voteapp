'use strict';

describe('Service: voteService', function () {

  // load the service's module
  beforeEach(module('voteappApp'));

  // instantiate service
  var voteService;
  beforeEach(inject(function (_voteService_) {
    voteService = _voteService_;
  }));

  it('should do something', function () {
    expect(!!voteService).toBe(true);
  });

});
