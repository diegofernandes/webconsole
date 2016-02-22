'use strict';

angular.module('meccanoAdminApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({
        id: user.ID
      });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  })
  .controller('AdminNewCtrl', function($scope, Auth, $state) {
    $scope.user = {
      role: 'user'
    };
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.createUser({
            name: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password,
            role: $scope.user.role
          })
          .then(function() {
            // Account created, redirect to home
            $state.go('admin', {}, {reload: true});
          })
          .catch(function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('serverError', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };


  });
