'use strict';

angular.module('meccanoAdminApp')
  .controller('NavbarCtrl', function($scope, $location) {
    $scope.menu = [ {
      'title': 'Devices',
      'link': '/device',
      'icon': 'glyphicon glyphicon-list-alt'
    }, {
      'title': 'Groups',
      'link': '/groups',
      'icon': 'glyphicon glyphicon-list-alt'
    }, {
      'title': 'Status',
      'link': '/status',
      'icon': 'glyphicon glyphicon-list-alt'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
