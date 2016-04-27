'use strict';

angular.module('meccanoAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('releases', {
        url: '/releases',
        templateUrl: 'app/releases/releases.html',
        abstract: true
      })
      .state('releases.list', {
        url: '/',
        authenticate: true,
        templateUrl: 'app/releases/releases.list.html',
        controller: 'ReleasesCtrlList'
      })
      .state('releases.new', {
        url: '/new',
        authenticate: true,
        templateUrl: 'app/releases/releases.edit.html',
        controller: 'ReleasesCtrlEdit'
      })
      .state('releases.detail', {
        url: '/{id}',
        authenticate: true,
        templateUrl: 'app/releases/releases.detail.html',
        controller: 'ReleasesCtrlDetail'
      });
  });
