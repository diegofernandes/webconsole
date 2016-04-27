'use strict';

angular.module('meccanoAdminApp')
  .filter('markdown', function() {
    var md = window.markdownit();
    return function(input) {
      if (input) {
        return md.render(input);
      } else {
        return;
      }

    };
  });
