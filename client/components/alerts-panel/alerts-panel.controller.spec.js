'use strict';

describe('Controller: AlertsPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('meccanoAdminApp'));

  var AlertsPanelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlertsPanelCtrl = $controller('AlertsPanelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
