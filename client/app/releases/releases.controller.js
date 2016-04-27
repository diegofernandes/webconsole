'use strict';

angular.module('meccanoAdminApp')
  .controller('ReleasesCtrlList', function($scope, Release, $state) {
    $scope.pageNumber = 1;



    $scope.pageChanged = function (parameters) {
      parameters.page = $scope.pageNumber;
      load(parameters);
    };

    function load(parameters) {
      Release.query(parameters).$promise.then(
        function(releases) {
          $scope.releases = releases.data;
          $scope.total = releases.page.totalElements;
        }
      );
    }


    $scope.parametersFilter = $state.params;
    load($scope.parametersFilter);

    $scope.open = function(id) {
      $state.go('releases.detail', {
        id: id
      });
    }
  })
  .controller('ReleasesCtrlEdit', function($scope, Release, $state) {

    $scope.regex = /^v?0|[1-9]d*\.0|[1-9]d*\.0|[1-9]\d*$/
    $scope.release = {};
    $scope.errors = {};

    $scope.save = function(form) {

      Release.save($scope.release).$promise
        .then(function() {
          $state.go('releases.list', {}, {
            reload: true
          });
        }).catch(function(err) {
          err = err.data;
          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.errors, function(error) {
              form[error.path].$setValidity('serverError', false);
              $scope.errors[error.path] = error.message;
            });
          }
        });
    }


  })
  .controller('ReleasesCtrlDetail', function($scope, Release, $stateParams) {
    $scope.release = Release.get({
      id: $stateParams.id
    });
  });
