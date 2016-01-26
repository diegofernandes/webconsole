'use strict';

describe('Service: devices', function () {

  // load the service's module
  beforeEach(module('meccanoAdminApp'));

  // instantiate service
  var devices;
  beforeEach(inject(function (_devices_) {
    devices = _devices_;
  }));

  it('should do something', function () {
    expect(!!devices).toBe(true);
  });

});
