'use strict';

describe('Component: PluginComponent', function () {

  // load the controller's module
  beforeEach(module('meccanoAdminApp'));

  var PluginComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PluginComponent = $componentController('PluginComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
