'use strict';

angular.module('meccanoAdminApp')
  .controller('DeviceCtrl', function ($scope, $http) {
    $scope.registeredDevices = [];

    $http.get('/api/devices').success(function(registeredDevices) {
      $scope.registeredDevices = registeredDevices;
    });
  });
