'use strict';

angular.module('meccanoAdminApp')
  .controller('MainCtrl', function($scope, $interval, $timeout, $state, DeviceStatus, $filter) {
    $scope.lastAnnouncements = [];
    $scope.statusResults = [];
    $scope.status = {
      NORMAL: false,
      FAIL: true,
      WAITING_APPROVE: false,
      WARNING: true
    };

    var statusColours = {
      FAIL: '#d9534f',
      NORMAL: '#5cb85c',
      WAITING_APPROVE: '#337ab7',
      WARNING: '#f0ad4e'
    };

    function colours(series) {
      return _.chain(series).map(function(item) {
        return statusColours[item];
      }).value();
    }

    function loadDeviceStatus() {
      $scope.deviceStatus = {
        labels: [],
        data: [],
        colours: ['#d9534f', '#5cb85c', '#337ab7', '#f0ad4e']
      };
      DeviceStatus.all().get({}, function(res) {
        $scope.deviceStatus.labels = _.keys(res.data);
        $scope.deviceStatus.data = _.values(res.data);
        $scope.deviceStatus.colours = colours($scope.deviceStatus.labels);

      }, function(err) {
        console.log(err);
      });
    }

    function loadDeviceStatusHistory() {
      $scope.deviceStatusHistory = {
        labels: [],
        series: [],
        data: []
      };

      DeviceStatus.history().get({
        size: ($scope.statusResults.length || 1) * 16,
        status: $scope.statusResults
      }, function(resp) {
        var creationDateDefault = _.chain(resp).uniqBy('creationDate').reduce(function(result, item) {
          result.push({
            numberOfDevices: 0,
            creationDate: item.creationDate
          });
          return result;
        }, []).value();

        var chart = {
          labels: _.chain(resp).uniqBy('creationDate').map('creationDate').sort().map(function(date) {
            return $filter('date')(date, 'shortTime');
          }).value(),
          series: _.chain(resp).uniqBy('status').map('status').sort().value()
        };
        chart.data = _.reduce(chart.series, function(result, item) {
          result.push(_.chain(resp).filter({
            status: item
          }).unionBy(creationDateDefault, 'creationDate').sortBy('creationDate').map('numberOfDevices').value());
          return result;
        }, []);
        chart.colours = colours(chart.series);
        $scope.deviceStatusHistory = chart;
      });
    }
    var statusTimeout;

    function startStatusTimeout() {
      if (angular.isDefined(statusTimeout)) {
        $timeout.cancel(statusTimeout);
      }
      statusTimeout = $timeout(function() {
        loadDeviceStatusHistory();
        statusTimeout = undefined;
      }, 1000);
    }


    $scope.$watchCollection('status', function(newStatus, oldStatus) {
      if (_.countBy(newStatus).true) {
        $scope.statusResults = [];
        angular.forEach(newStatus, function(value, key) {
          if (value) {
            $scope.statusResults.push(key);
          }
        });
        startStatusTimeout();
      } else {
        $scope.status = oldStatus;
      }
    });

    // Load Statistics of Devices to populate the charts
    loadDeviceStatus();

    $scope.refresh = function() {
      loadDeviceStatus();
      loadDeviceStatusHistory();
    };

    // Reload charts in five minutes
    var intervalCharts = $interval($scope.refresh, 300000);
    // Go to page Devices With selected status of the chart
    $scope.onClick = function(points) {
      $state.go('device.list', {
        status: points[0].label
      });
    };

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      if (angular.isDefined(statusTimeout)) {
        $timeout.cancel(statusTimeout);
      }
      if (angular.isDefined(intervalCharts)) {
        $interval.cancel(intervalCharts)
      }
    });
  });
