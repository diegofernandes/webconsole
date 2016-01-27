'use strict';

angular.module('meccanoAdminApp')
  .controller('DeviceListCtrl', function($scope, Registration, $state, $stateParams, DeviceStatus, $rootScope) {
      
    // Initialize variables
    $scope.pageNumber = 1;
    $scope.parametersFilter = {};

    $scope.Devices = DeviceStatus;

    $rootScope.titlePanel = 'Devices';

    // Status devices for populate input options
    $scope.statusDevices = ['ALL', 'NORMAL', 'WARNING', 'FAIL', 'WAITING_APPROVAL'];


    $scope.registeredDevices = {};

    $scope.showDetails = function(device){
      $scope.Devices.selectedDevice = device;
    }
    // $scope.DeviceStatus = Registration.query({
    //   page:$scope.pageNumber
    // });

      Registration.query({
        page:$scope.pageNumber
      }).$promise.then(function(obj){
        $scope.registeredDevices.data = obj.data;
      });

    if ($state.params.status) {
      DeviceStatus.byStatus().get({status: $state.params.status}, function (res){
        console.log(res.data)
        $scope.registeredDevices.data = res.data;
      }, function (err){
        console.log(err);
      });
    }

    /** 
      * Function to search devices by selected filter
      * @param parameters {object}
      * @param status
      * @param device
      * @param group
      * @param page
      */
    $scope.search = function(parameters){

      $state.go('device.list', parameters);

    }

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

.controller('DeviceDetailCtrl', function($scope, $http, $state, $stateParams, $rootScope, DeviceStatus) {
  $scope.device = {
    device: $stateParams.deviceId,
    device_group: 0
  };

  $scope.Devices = DeviceStatus;

  console.log(DeviceStatus);

  $rootScope.titlePanel = 'Device Details';

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
