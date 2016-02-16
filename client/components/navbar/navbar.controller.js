'use strict';

angular.module('meccanoAdminApp')
  .controller('NavbarCtrl', function($scope, $location, Auth) {
    $scope.menu = [ {
      'title': 'Devices',
      'state': 'device.list',
      'icon': 'glyphicon glyphicon-list-alt'
    },{
      'title': 'Activity',
      'state': 'announcements.list',
      'icon': 'glyphicon glyphicon-signal'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
