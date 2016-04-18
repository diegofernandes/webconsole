'use strict';


angular.module('meccanoAdminApp')
  .controller('PluginListCtrl', function($scope, Registration, $state, $stateParams, Plugins) {
    console.log("*** PluginListCtrl ***");
    // Initialize variables
    $scope.pageNumber = 1;
    $scope.parametersFilter = $state.params;
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
