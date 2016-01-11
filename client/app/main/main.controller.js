'use strict';

angular.module('meccanoAdminApp')
  .controller('MainCtrl', function($scope, $http) {
    $scope.lastAnnouncements = [];
    $scope.deviceStatus = {labels:[], data:[]};


    $http.get('/api/lastAnnouncements').success(function(lastAnnouncements) {
      $scope.lastAnnouncements = lastAnnouncements;
    });

    $http.get('/api/deviceStatus').success(function(deviceStatus) {
      $scope.deviceStatus.labels = _.keys(deviceStatus);
      $scope.deviceStatus.data = _.values(deviceStatus);
      $scope.deviceStatus.colours = ['#5cb85c', '#f0ad4e', '#d9534f'];
      $scope.deviceStatus.map = deviceStatus;
    });


    $scope.deviceStatusHistory = {
      labels:["January", "February", "March", "April", "May", "June", "July"],
      series:['Ok', 'Warning', 'Error'],
      data: [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [3, 9, 0, 30, 46, 87, 9]
      ],
      colours : ['#5cb85c', '#f0ad4e', '#d9534f']

    };



  });
