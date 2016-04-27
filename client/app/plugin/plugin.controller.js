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

  // --- Edit Plugin
  $scope.edit = function(data) {
    console.log(data.id)
    $stateParams.id = data.id;
    $state.go('plugin.edit', $stateParams);
  };
  // --- Remove plugin
  $scope.destroy = function() {
    $http.delete('api/plugins/' + $scope.Plugins.selected.id).then(function() {
      $state.go('plugin.list', $stateParams,{reload: true});
    });
  };
  // --- Change Plugin status
  $scope.enablePlugin = function(data) {
    data.plugin.enabled = ! data.plugin.enabled;
    $http.put('api/plugins/' + data.plugin.id, data.plugin)
      .success(function (data, status, headers, config) {
        console.log("SUCESS");
      })
      .error(function (data, status, header, config) {
        console.log("ERROR");
    });
    $state.go('plugin.list', $stateParams, { reload: true });
  }
})
.controller('PluginInstallCtrl', function($scope, Plugins, $state, $stateParams, $http) {
  console.log("** PluginInstallCtrl **");
  // --- Cancel Button
  $scope.cancel = function() {
    $state.go('plugin.list', $stateParams, { reload: true});
  }
  // -- Load the plugin database
  $http.get('api/plugins/database').then(function(res) {
    var databasePlugins = res.data;
    $http.get('api/plugins').then(function(res) {
      var localPlugins = res.data.data;
      for(var d=0; d<databasePlugins.length; d++) {
        for(var l=0; l<localPlugins.length; l++) {
          if(databasePlugins[d].id == localPlugins[d].id) {
            databasePlugins[d].status = "INSTALLED";
          } else {
            databasePlugins[d].status = "AVAILABLE";
          }
        }
      }
      $scope.data = databasePlugins;
    });
    $scope.data = res.data;
    // Install Plugin to local database
    $scope.installPlugin = function(id) {
      // Load the plugin definition and insert to the plugin local database
      var o = _.findKey($scope.data,  { "id" : id });
      // Get details of plugin
      $http.get('/api/plugins/database/' + id).then(function(res) {
        var pluginDataDetails = res.data;
        // Insert data to the database
        $http.post('api/plugins/', pluginDataDetails)
          .success(function (data, status, headers, config) {
            console.log("SUCESS");
            console.log($scope.data[o]);
          })
          .error(function (data, status, header, config) {
            console.log("ERROR");
        });
        $state.go('plugin.list', $stateParams,{reload: true});
      });
    };
  });
})
.controller('PluginEditCtrl', function($scope, Plugins, $state, $stateParams, $http) {
  // Load plugin details and configuration keys
  $http.get('api/plugins/' + $stateParams.id).then(function(res) {
    delete $scope.data;
    $scope.data = res.data;
    $http.get('api/plugins/' + $stateParams.id + "/keys/").then(function(config) {
      $scope.data.config = config.data;
      // Select domains
      $scope.enabledOptions = [{ name: "Yes", id: true }, { name: "No", id: false }];
      $scope.enabledSelected = $scope.data.enabled ? $scope.enabledOptions[0] : $scope.enabledOptions[1];
      // Functions
      // --- Cancel
      $scope.cancel = function() {
        $state.go('plugin.list', $stateParams, { reload: true });
      };
      // --- Save
      $scope.save = function(data) {
        console.log("*** SAVE *** ");
        data.plugin.enabled = ($scope.enabledSelected.id == true);
        $http.put('api/plugins/' + data.plugin.id, data.plugin)
          .success(function (data, status, headers, config) {
            console.log(data.id + ": SUCESS");
          })
          .error(function (data, status, header, config) {
            console.log(data.id + ": ERROR");
        }).then( function () {
          // Updates the plugins
          var keyCfg = data.plugin.config.data;
          for(var p = 0; p < keyCfg.length; p++) {
            var keyValue = keyCfg[p];
            if(keyValue) {
              $http.put('api/plugins/' + data.plugin.id + '/keys/' + keyValue.key, keyValue)
                .success(function (data, status, headers, config) {
                  console.log(keyValue.key + ": SUCESS");
                })
                .error(function (data, status, header, config) {
                  console.log(keyValue.key + ": ERROR");
              });
            }
          }
          return true;
        });
        $state.go('plugin.list', $stateParams, { reload: true });
      }
    });
  });
});
