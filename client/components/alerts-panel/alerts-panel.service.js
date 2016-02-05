'use strict';

angular.module('meccanoAdminApp')
  .factory('alertsPanel', function () {

    var alerts = [];

    function addWarning(msg) {
      alerts.push({type:'warning',msg:msg});
    }

    function addError(msg) {
      alerts.push({type:'danger',msg:msg});
    }

    function addSuccess(msg) {
      alerts.push({type:'success',msg:msg});
    }



    return {
      alerts:alerts,
      addWarning: addWarning,
      addError:addError,
      addSuccess:addSuccess
    };
  });
