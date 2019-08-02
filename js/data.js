'use strict';

(function () {
  var photos = [];

  window.data = {
    load: function (callback) {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'https://js.dump.academy/kekstagram/data', true);

      xhr.send();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.constants.SUCCESS_OK && xhr.readyState === window.constants.READYSTATE_DONE) {
          photos = xhr.response;
          callback(photos);
        }
      });
    },

    get: function () {
      return photos;
    },

    send: function (form, status) {
      var xhr = new XMLHttpRequest();

      xhr.open('POST', 'https://js.dump.academy/kekstagram', true);
      xhr.send(form);

      var uploadForm = document.querySelector('.img-upload__form');
      uploadForm.reset();

      // Вызываем функцию для создания блока загрузки
      var loadBlock = document.querySelector('.loading');
      if (loadBlock.classList.contains('hidden')) {
        loadBlock.classList.remove('hidden');
      }

      xhr.addEventListener('load', function () {
        if (xhr.readyState === window.constants.READYSTATE_DONE && xhr.status === window.constants.SUCCESS_OK) {
          status('success');
        }
      });

      xhr.addEventListener('error', function () {
        if (xhr.readyState === window.constants.READYSTATE_DONE) {
          status('error');
        }
      });
    }
  };
})();
