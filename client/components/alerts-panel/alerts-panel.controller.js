'use strict';

angular.module('meccanoAdminApp')
  .controller('AlertsPanelCtrl', function($scope, alertsPanel) {
    $scope.alertsPanel = alertsPanel;

    $scope.closeAlert = function(index) {
      $scope.alertsPanel.alerts.splice(index, 1);
    };
  });
