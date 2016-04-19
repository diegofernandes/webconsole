'use strict';


angular.module('meccanoAdminApp')
  .controller('PluginListCtrl', function($scope, Registration, $state, $stateParams, Plugins) {
    // Initialize variables
    $scope.pageNumber = 1;
    $scope.parametersFilter = $state.params;
    $scope.Plugins = Plugins;
    $scope.Plugins.query($state.params, function (res) {
           // Total Items to pagination
           $scope.totalItems = res.page.totalElements;
           $scope.data = res.data;
           // Stop load gif
           $scope.isLoading = false;
         }, function (err){
           // Erase plugins array if no plugin was found
           if (err.status === 404) {
             $scope.data = [];
             $scope.isLoading = false;
           }
    });

    // Show plugin details
    $scope.showDetails = function(plugin){
      $scope.Plugins.selected = plugin;
    };

    // Install new plugin in the system
    $scope.install = function() {
      $state.go('plugin.install');
    }

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
.controller('PluginInstallCtrl', function($scope, Plugins, $state, $stateParams, $http) {
  console.log("** PluginInstallCtrl **");
})
.controller('PluginEditCtrl', function($scope, Plugins, $state, $stateParams, $http) {
  console.log("** PluginEditCtrl **");
  console.log($stateParams);
  $http.get('api/plugins/' + $stateParams.id).then(function(res) {
    $scope.data = res.data;
  });
  // console.log(Plugins);
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
