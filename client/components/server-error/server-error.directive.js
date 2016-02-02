'use strict';

angular.module('meccanoAdminApp')
  .directive('serverError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', function() {
          return ngModel.$setValidity('serverError', true);
        });
      }
    };
  });
