'use strict';

angular.module('meccanoAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reports', {
        url: '/reports',
        templateUrl: 'app/reports/reports.html',
        abstract: true
      })
      .state('reports.list', {
        url: '/',
        authenticate: true,
        templateUrl: 'app/reports/reports.list.html',
        controller: 'ReportsCtrlList'
      })
      .state('reports.detail', {
        url: '/{id}',
        authenticate: true,
        templateUrl: 'app/reports/reports.detail.html',
        controller: 'ReportsCtrlDetail'
      });
  });
