'use strict';

(function () {
  var photos = [];

  window.data = {
    load: function (callback) {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'https://js.dump.academy/kekstagram/data', true);
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');

      xhr.send();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.constants.SUCCESS_OK && xhr.readyState === window.constants.READYSTATE_DONE) {
          photos = xhr.response;
          callback(photos);
        }
      });
    },
    getPhotos: function () {
      return photos;
    }
  };
})();
