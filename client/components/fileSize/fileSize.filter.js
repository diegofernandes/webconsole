'use strict';

angular.module('meccanoAdminApp')
  .filter('fileSize', function () {
    return function (input) {
      if(input){
        return filesize(input);
      }else{
        return;
      }
    };
  });
