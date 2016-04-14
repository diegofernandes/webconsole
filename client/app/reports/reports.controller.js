'use strict';

angular.module('meccanoAdminApp')
  .controller('ReportsCtrlList', function($scope, Reports, $state) {
    $scope.plugins = Reports.query();
    $scope.open = function(plugin) {
      $state.go('reports.detail', {
        id: plugin
      });
    }
  })
  .controller('ReportsCtrlDetail', function($scope, Reports, $state, $stateParams, $http, $interval) {
    $scope.ts = 0;
    var params = $stateParams.id.split(/\s*:\s*/);
    $scope.key = {
      plugin: params[0],
      version: params[1],
    };

    $scope.plugin = Reports.details($scope.key);

    $scope.reloadImg = function() {
      $scope.ts = new Date().getTime();
    }

    var intervalReloadImg = $interval($scope.reloadImg,60000);

    $scope.reloadImg();

    $scope.$on('$destroy', function() {
      if (angular.isDefined(intervalReloadImg)) {
        $interval.cancel(intervalReloadImg);
      }
    });
  });
