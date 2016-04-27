'use strict';

angular.module('meccanoAdminApp')
  .controller('NavbarCtrl', function($scope, $location, Auth, NavBar) {
    $scope.menu = [{
      'title': 'Devices',
      'state': 'device.list',
      'icon': 'glyphicon glyphicon-list-alt'
    }, {
      'title': 'Activity',
      'state': 'announcements.list',
      'icon': 'glyphicon glyphicon-signal'

    }, {
      'title': 'OTA',
      'state': 'releases.list',
      'icon': 'glyphicon glyphicon-send'

    }, {
      'title': 'Plugins',
      'state': 'plugin.list',
      'icon': 'glyphicon glyphicon-equalizer'

    }];

    NavBar.query(function(config) {
      if (config.reports) {
        $scope.menu.push({
          'title': 'Reports',
          'state': 'reports.list',
          'icon': 'glyphicon glyphicon-scale'
        });
      }
    });

    $scope.isCollapsed = true;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
