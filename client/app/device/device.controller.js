'use strict';

angular.module('meccanoAdminApp')
  .controller('DeviceListCtrl', function($scope, Registration, $state, $stateParams, Devices, $rootScope) {
      
    // Initialize variables
    $scope.pageNumber = 1;
    $scope.parametersFilter = $state.params;

    $scope.Devices = Devices;

    // Status devices for populate input options
    $scope.statusDevices = ['NORMAL', 'WARNING', 'FAIL', 'WAITING_APPROVE'];

    $scope.registeredDevices = {};



    /** Function to load devices by device service 
      * @param parameters {object}
      * @param status
      * @param device
      * @param group
      * @param page
      * @param size
      **/
    function getDevices (parameters){
      $scope.Devices.loadDevices().get(parameters, function (res){

        // Total Items to pagination
        if (res.data){
          $scope.totalItems = res.page.totalElements;
          $scope.registeredDevices.data = res.data;
        } else {
          $scope.totalItems = 1;
          $scope.registeredDevices.data = [];
          $scope.registeredDevices.data.push(res);
        }

      }, function (err){
        // Erase registeredDevices array if no device was found
        if (err.status === 404) {
          $scope.registeredDevices.data = [];
        }
      });
    };

    getDevices($state.params);

    /**
      * Show Details in a lateral panel
      * @params device {object}
      */
    $scope.showDetails = function(device){
      $scope.Devices.selected = device;
    }

    /** 
      * Function to search devices by selected filter
      * @param parameters {object}
      * @param status
      * @param device
      * @param group
      * @param page
      * @param size
      */
    $scope.search = function(parameters){
      parameters.page = 1;

      $state.go('device.list', parameters, {reload: true});

    }

    console.log('DeviceListCtrl',  $scope.pageNumber );
    $scope.pageChanged = function (parameters) {

      parameters.page = $scope.pageNumber;
      getDevices(parameters);

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

.controller('DeviceEditCtrl', function($scope, Devices, $state, $stateParams) {


  $scope.Device = Devices;
  console.log($state.params)
  if ($scope.Device.selected == null) {
    Devices.loadDevices().get({device: $state.params.deviceId}, function (res){
      $scope.Device.selected = res;
    });
  }

  $scope.save = function() {
    Devices.loadDevices().update({device: $state.params.deviceId}, $scope.Device.selected);
    $state.go('device.list');
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

.controller('DeviceDetailCtrl', function($scope, $http, $state, $stateParams, $rootScope, Devices) {
  $scope.device = {
    device: $stateParams.deviceId,
    device_group: 0
  };

  $scope.Devices = Devices;  

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
