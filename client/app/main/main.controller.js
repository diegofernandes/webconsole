'use strict';

angular.module('meccanoAdminApp')
  .controller('MainCtrl', function($scope, $interval, $state, DeviceStatus) {
    $scope.lastAnnouncements = [];
  
    function loadDeviceStatus (){
      $scope.deviceStatus = {
        labels: [],
        data: []
      };
      DeviceStatus.all().get({}, function (res){
        angular.forEach(res.data, function (item){
          $scope.deviceStatus.labels.push(item.status);
          $scope.deviceStatus.data.push(item.count);
        });
      }, function (err){
          console.log(err);
      });
    };

    // Load Statistics of Devices to populate the chart pie
    loadDeviceStatus();

    // Reload chart pie in five minutes
    $interval(function(){
      loadDeviceStatus();
    }, 300000);

    $scope.deviceStatusHistory = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      series: ['Ok', 'Warning', 'Error'],
      data: [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [3, 9, 0, 30, 46, 87, 9]
      ],
      colours: ['#5cb85c', '#f0ad4e', '#d9534f']
    };

    // Go to page Devices With selected status of the chart
    $scope.onClick = function(points, evt) {
      $state.go('device.list',{status:points[0].label});
    };
  });
