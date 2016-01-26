'use strict';

angular.module('meccanoAdminApp')
  .controller('DeviceListCtrl', function($scope, Registration, $state, $stateParams) {
    $scope.pageNumber = 1;

    $scope.registeredDevices = {};
    $scope.registeredDevices = Registration.query({
      page:$scope.pageNumber
    });

    console.log('DeviceListCtrl',  $scope.pageNumber );
    $scope.pageChanged = function () {
      console.log('pageChanged',  $scope.pageNumber );
       Registration.query({
        page:$scope.pageNumber
      }).$promise.then(function(obj){
        $scope.registeredDevices.data = obj.data;
      });

    }

  })

.controller('DeviceRegisterCtrl', function($scope, Registration, $state, $stateParams) {
  $scope.registration = new Registration();

  $scope.save = function() {
    $scope.registration.$save().then(function(data) {
      $state.go('device.list', $stateParams);
    });
  };
  $scope.cancel = function() {
    $state.go('device.list', $stateParams);
  };
})

.controller('DeviceEditCtrl', function($scope, Registration, $state, $stateParams) {
  $scope.registration = Registration.get({
    device: $stateParams.deviceId
  });
  $scope.save = function() {
    $scope.registration.$update().then(function(data) {
      $state.go('device.list', $stateParams);
    });
  };
  $scope.destroy = function() {
    $http.delete('api/device/' + $scope.device.device).then(function(data) {

      $state.go('device.list', $stateParams);
    });
  };
  $scope.cancel = function() {
    $state.go('device.list', $stateParams);
  };
})





.controller('DeviceDetailCtrl', function($scope, $http, $state, $stateParams) {
  $scope.device = {
    device: $stateParams.deviceId,
    device_group: 0
  };

  $scope.save = function() {
    $http.post('api/device', $scope.device).then(function(data) {
      $state.go('device.list', $stateParams);
    });
  };
  $scope.destroy = function() {
    $http.delete('api/device/' + $scope.device.device).then(function(data) {

      $state.go('device.list', $stateParams);
    });
  };
  $scope.cancel = function() {
    $state.go('device.list', $stateParams);
  };
});
