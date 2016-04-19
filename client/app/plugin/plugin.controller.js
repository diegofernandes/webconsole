'use strict';


angular.module('meccanoAdminApp')
  .controller('PluginListCtrl', function($scope, Registration, $state, $stateParams, Plugins) {
    // Initialize variables
    $scope.pageNumber = 1;
    $scope.parametersFilter = $state.params;
    $scope.Plugins = Plugins;

    function getPlugins (parameters) {
      // Start load gif
      $scope.isLoading = true;
      $scope.Plugins.loadPlugins().get(parameters, function (res) {
        // Total Items to pagination
        $scope.totalItems = res.page.totalElements;
        $scope.Plugins.data = res.data;
        // Stop load gif
        $scope.isLoading = false;
      }, function (err){
        // Erase plugins array if no plugin was found
        if (err.status === 404) {
          $scope.plugins.data = [];
          $scope.isLoading = false;
        }
      });
    }
    // Load devices by the parameters from url
    getPlugins($state.params);

    $scope.showDetails = function(plugin){
      $scope.Plugins.selected = plugin;
    };

})
.controller('PluginDetailCtrl', function($scope, $http, $state, $stateParams, $rootScope, Plugins, $uibModal, Messages, Auth, Modal, alertsPanel) {
  $scope.Plugins = Plugins;

  // Edit Plugin
  $scope.edit = function(data) {
    console.log(data.id)
    $stateParams.id = data.id;
    $state.go('plugin.edit', $stateParams);
  };

  // Remove plugin
  $scope.destroy = function() {
    $http.delete('api/plugins/' + $scope.Plugins.selected.id).then(function() {
      $state.go('plugin.list', $stateParams,{reload: true});
    });
  };
})
.controller('PluginEditCtrl', function($scope, Plugins, $state, $stateParams, $http) {
  console.log("** PluginEditCtrl **");
//  $scope.Plugins = Plugins;
  /*
  $scope.inputDisabled = true;
  if ($scope.Plugin.selected === null || $scope.Plugin.selected === undefined) {
    Plugins.get({ id : $state.params.pluginId }, function (res){
      $scope.Plugin.selected = res;
    });
  }
  $scope.save = function() {
    Plugins.plugins().update({plugin: $state.params.pluginId}, $scope.Plugin.selected);
    $state.go('plugin.list', {}, {reload: true});
  };
  $scope.destroy = function() {
    $http.delete('api/plugins/' + $scope.plugin.plugin).then(function() {
      $state.go('plugin.list', $stateParams,{reload: true});
    });
  };
  $scope.cancel = function() {
    $state.go('plugin.list', $stateParams);
  };
  */
});
