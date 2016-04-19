'use strict';


angular.module('meccanoAdminApp')
  .controller('PluginListCtrl', function($scope, Registration, $state, $stateParams, Plugins) {
    console.log("*** PluginListCtrl ***");
    // Initialize variables
    $scope.pageNumber = 1;
    $scope.parametersFilter = $state.params;
    $scope.Plugins = Plugins;

    /** Function to load devices by device service
      * @param parameters {object}
      * @param status
      * @param device
      * @param group
      * @param page
      * @param size
      **/
    function getPlugins (parameters) {
      // Start load gif
      $scope.isLoading = true;
      $scope.Devices.loadPlugins().get(parameters, function (res) {
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
    }

    // Load devices by the parameters from url
    getPlugins($state.params);
    console.log($scope);
})
.controller('PluginDetailCtrl', function($scope, $http, $state, $stateParams, $rootScope, Devices, $uibModal, Messages,Auth, Modal,alertsPanel) {

  console.log("*** PluginDetailCtrl ***");
  // $scope.Plugins = Plugins;

  $scope.Plugins = {[
    {
      "plugin" : "dataFilter:1.0",
      "engine" : "R",
      "enabled" : true,
      "schedule" : "15 * * * *",
      "description" : "Filter data of the sensors (version 1.0)",
      "type" : "worker",
      "executionContext" : "both"
    },
    {
      "plugin" : "deviceAvgTime:1.0",
      "engine" : "R",
      "enabled" : true,
      "schedule" : "*/15 * * * *",
      "description" : "Device Average Response Time",
      "type" : "report",
      "executionContext" : "both"
    }
  ]};
});
