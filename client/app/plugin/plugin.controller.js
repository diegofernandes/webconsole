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
  $http.get('api/plugins/database').then(function(res) {
    var databasePlugins = res.data;
    $http.get('api/plugins').then(function(res) {
      var localPlugins = res.data.data;
      // console.log(databasePlugins);
      // console.log(localPlugins);
      for(var d=0; d<databasePlugins.length; d++) {
        for(var l=0; l<localPlugins.length; l++) {
          if(databasePlugins[d].name == localPlugins[d].name) {
            databasePlugins[d].status = "INSTALLED";
          } else {
            databasePlugins[d].status = "AVAILABLE";
          }
        }
      }
      $scope.data = databasePlugins;
    });
    /* var dadosDb = db.data;
    // Compute the status of the existing plugins
    $http.get('api/plugins').then(function(local) {
      // console.log(local.data.data);
      var localData = local.data;
      // console.log(dadosDb);
      // console.log(dadosLocais.data);
      for(var ddb in dadosDb) {
        for(var dlo in localData.data) {
          console.log(ddb);
          console.log(dlo);
        }
      }
    });
    */
    $scope.data = res.data;
  });
})
.controller('PluginEditCtrl', function($scope, Plugins, $state, $stateParams, $http) {
  console.log("** PluginEditCtrl **");
  console.log($stateParams);
  $http.get('api/plugins/' + $stateParams.id).then(function(res) {
    $scope.data = res.data;
  });
});
