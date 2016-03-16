'use strict';

angular.module('meccanoAdminApp')
  .filter('prettyCron', function () {
    return function (input) {
      if(input){
        return prettyCron.toString(input)
      }else {
        return input;
      }
    };
  });
