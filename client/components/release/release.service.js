'use strict';

angular.module('meccanoAdminApp')
  .factory('Release', function($resource) {
    return $resource('/api/releases/:id/', null, {
      query: {isArray:false,cache:false},
      save: {
        method: 'POST',
        headers:{'Content-Type':undefined},
        transformRequest: function(data, headersGetter) {
          console.log(data);
          // Here we set the Content-Type header to null.
          var headers = headersGetter();
          headers['Content-Type'] = undefined;

          // And here begins the logic which could be used somewhere else
          // as noted above.
          if (data == undefined) {
            return data;
          }

          var fd = new FormData();

          var createKey = function(_keys_, currentKey) {
            var keys = angular.copy(_keys_);
            keys.push(currentKey);
            var formKey = keys.shift()

            if (keys.length) {
              formKey += "[" + keys.join("][") + "]"
            }

            return formKey;
          }

          var addToFd = function(object, keys) {
            angular.forEach(object, function(value, key) {
              var formKey = createKey(keys, key);

              if (value instanceof File) {
                fd.append(formKey, value);
              } else if (value instanceof FileList) {
                if (value.length == 1) {
                  fd.append(formKey, value[0]);
                } else {
                  angular.forEach(value, function(file, index) {
                    fd.append(formKey + '[' + index + ']', file);
                  });
                }
              } else if (value && (typeof value == 'object' || typeof value == 'array')) {
                var _keys = angular.copy(keys);
                _keys.push(key)
                addToFd(value, _keys);
              } else {
                fd.append(formKey, value);
              }
            });
          }

          addToFd(data, []);

          console.log(fd);
          return fd;
        }
      }
    });
  });
