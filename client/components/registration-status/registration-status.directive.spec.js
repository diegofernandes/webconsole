'use strict';

describe('Directive: registrationStatus', function () {

  // load the directive's module and view
  beforeEach(module('meccanoAdminApp'));
  beforeEach(module('components/registration-status/registration-status.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<registration-status></registration-status>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the registrationStatus directive');
  }));
});