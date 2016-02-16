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
      // Start load gif
      $scope.isLoading = true;

      $scope.Devices.loadDevices().get(parameters, function (res){

        // Total Items to pagination
        $scope.totalItems = res.page.totalElements;
        $scope.registeredDevices.data = res.data;

        // Stop load gif
        $scope.isLoading = false;
      }, function (err){
        // Erase registeredDevices array if no device was found
        if (err.status === 404) {
          $scope.registeredDevices.data = [];
          $scope.isLoading = false;
        }
      });
    };

    // Load devices by the parameters from url
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
      $state.go($state.current, parameters, {reload: true});
    };
    $scope.pageChanged = function (parameters) {
      parameters.page = $scope.pageNumber;
      getDevices(parameters);
    };
  })

.controller('DeviceRegisterCtrl', function($scope, $state, $stateParams, Devices) {
  // $scope.registration = new Registration();

  $scope.Devices = Devices;

  $scope.save = function() {
    Devices.devices().post($scope.Device.selected, function (res){
      console.log(res)
    }, function (err){
      console.log(err)
    });
    $state.go('device.list', {}, {reload: true});
  };
  // $scope.save = function() {
  //   $scope.registration.$save().then(function(data) {
  //     $state.go('device.list', $stateParams);
  //   });
  // };
  // $scope.cancel = function() {
  //   $state.go('device.list', $stateParams);
  // };
})

.controller('DeviceEditCtrl', function($scope, Devices, $state, $stateParams) {


  $scope.Device = Devices;

  $scope.inputDisabled = true;
  if ($scope.Device.selected == null) {
    Devices.loadDevices().get({device: $state.params.deviceId}, function (res){
      $scope.Device.selected = res;
    });
  }

  $scope.save = function() {
    Devices.devices().update({device: $state.params.deviceId}, $scope.Device.selected);
    $state.go('device.list', {}, {reload: true});
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

.controller('DeviceDetailCtrl', function($scope, $http, $state, $stateParams, $rootScope, Devices, $uibModal) {

  $scope.labels = ["January"];
  // $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 10],
    [28, -20]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  $scope.Devices = Devices;


  $scope.destroy = function (device) {
    console.log(device)

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './app/device/delete.confirm.html',
      controller: 'DeleteDeviceCtrl',
      size: 'xs',
      resolve: {
        device: function () {
          return device;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $state.go($state.current, {}, {reload: true});
      $scope.Devices.selected = null;
    }, function () {

    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };


})
.controller('DeleteDeviceCtrl', function ($scope, $uibModalInstance, device, Devices, $timeout){

  console.log(device);

  $scope.destroy = function() {
    Devices.devices().delete({device: device.device});

    $timeout(function(){
      $uibModalInstance.close();
    }, 500);


  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
