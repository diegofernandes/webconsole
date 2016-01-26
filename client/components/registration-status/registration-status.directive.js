'use strict';

angular.module('meccanoAdminApp')
  .directive('registrationStatus', function () {
    return {
      template: '<span uib-tooltip="{{tooltip}}" class="glyphicon {{icon}}" aria-hidden="true"></span>',
      restrict: 'EA',
      scope: {
        registration: '=registration'
      },
      controller: function($scope) {

        if($scope.registration.registrationDate !== null) {
          $scope.icon = 'glyphicon-ok text-success';
          $scope.tooltip = 'Device Resgistred';
        } else {
          $scope.icon = 'glyphicon-time text-warning';
          $scope.tooltip = 'Device Resgistred but watting for acknowledgement';
        }
      }
    };
  });
