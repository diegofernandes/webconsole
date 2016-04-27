'use strict';

describe('Component: PluginCtrl', function () {

  // load the controller's module
  beforeEach(module('meccanoAdminApp'));

  var PluginComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PluginComponent = $componentController('PluginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
