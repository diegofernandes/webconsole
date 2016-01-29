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

        if ($scope.registration.status === 'NORMAL') {
          $scope.icon = 'glyphicon-ok text-success';
          $scope.tooltip = 'Device Resgistred';
        } 
        if ($scope.registration.status === 'WAITING_APPROVE') {
          $scope.icon = 'glyphicon-time text-info';
          $scope.tooltip = 'Device Resgistred but watting for acknowledgement';
        } 
        if (($scope.registration.status === 'FAIL')) {
          $scope.icon = 'glyphicon glyphicon-ban-circle text-danger';
          $scope.tooltip = 'Device in state fail';
        }
        if (($scope.registration.status === 'WARNING')) {
          $scope.icon = 'glyphicon glyphicon-warning-sign text-warning';
          $scope.tooltip = 'Device with alert state';
        }
      }
    };
  });
