'use strict';
(function(){

function PluginComponent($scope) {
  $scope.message = 'Hello';
  // Initialize variables
  $scope.plugin.list = {[
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
}

angular.module('meccanoAdminApp')
  .component('plugin', {
    templateUrl: 'app/plugin/plugin.html',
    controller: PluginComponent
  });

})();
