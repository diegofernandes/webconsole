'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('meccanoAdminApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/lastAnnouncements')
      .respond([
        {'channel':'humidity','date':1451934641396,'device_group':666,'device':'18:fe:34:fd:b2:a8','sensor':1,'data':30},
        {'channel':'humidity','date':1451934641396,'device_group':666,'device':'18:fe:34:fd:b2:a8','sensor':1,'data':37}
    ]);

    $httpBackend.expectGET('/api/deviceStatus')
      .respond({
        'ok': Math.random(),
        'warning': Math.random(),
        'error': Math.random()
      });


    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of lastAnnouncements to the scope', function () {
    $httpBackend.flush();
    expect(scope.lastAnnouncements.length).toBe(2);
  });
});
