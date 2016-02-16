'use strict';

angular.module('meccanoAdminApp')
  .controller('MainCtrl', function($scope, $interval, $state, DeviceStatus) {
    $scope.lastAnnouncements = [];




    function loadDeviceStatus() {
      $scope.deviceStatus = {
        labels: [],
        data: []
      };
      DeviceStatus.all().get({}, function(res) {

        angular.forEach(res.data, function(item) {
          $scope.deviceStatus.labels.push(item.status);
          $scope.deviceStatus.data.push(item.count);
        });

      }, function(err) {
        console.log(err);
      });
    };

    loadDeviceStatus();

    $interval(function() {
      loadDeviceStatus();
      loadDeviceStatusHistory();
    }, 300000);


    function loadDeviceStatusHistory() {
      $scope.deviceStatusHistory = {
        labels: [],
        series: [],
        data: []
      };

      DeviceStatus.history.get(function(resp) {
        var creationDateDefault = _.chain(resp.data).uniqBy('creationDate').reduce(function(result, item) {
          result.push({
            numberOfDevices: 0,
            creationDate: item.creationDate
          });
          return result;
        }, []).value();


        var chart = {
          labels: _.chain(resp.data).uniqBy('creationDate').map('creationDate').sort().value(),
          series: _.chain(resp.data).uniqBy('status').map('status').sort().value()
        };
        chart.data = _.reduce(chart.series, function(result, item) {
          result.push(_.chain(resp.data).filter({
            status: item
          }).unionBy(creationDateDefault, 'creationDate').sortBy('creationDate').map('numberOfDevices').value());
          return result;
        }, []);

        $scope.deviceStatus = chart;

      });
    }

    $scope.onClick = function(points, evt) {
      console.log(points, evt);

      $state.go('main.dash', {
        status: points[0].label
      }, {
        reload: true
      });
    };

  });
