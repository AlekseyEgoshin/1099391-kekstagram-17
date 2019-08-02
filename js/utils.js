'use strict';

(function () {
  var lastTimeout;

  window.utils = {
    debounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, window.constants.DEBOUNCE_INTERVAL);
    },

    load: function () {
      var root = document.querySelector('.root');

      var loadingMessage = document.querySelector('#messages').content.querySelector('.img-upload__message');
      var loadingMessageClone = loadingMessage.cloneNode(true);
      loadingMessageClone.classList.add('loading__inner');

      var createDiv = document.createElement('div');
      createDiv.classList.add('loading', 'hidden');
      createDiv.appendChild(loadingMessageClone);

      var uploadError = document.querySelector('#error').content.querySelector('.error');
      uploadError.classList.add('visually-hidden');
      root.appendChild(uploadError.cloneNode(true));

      var uploadSuccess = document.querySelector('#success').content.querySelector('.success');
      uploadSuccess.classList.add('visually-hidden');
      root.appendChild(uploadSuccess.cloneNode(true));

      root.appendChild(createDiv);
    },
    status: function (message) {

      function onWindowEscPress(evt) {
        window.utils.escPress(evt, closeMessage);
      }

      function onWindowClick(evt) {
        if (evt.target.classList.contains('success')
          || evt.target.classList.contains('error')
          || evt.target.classList.contains('success__button')
          || evt.target.classList.contains('error__button')) {

          closeMessage();
        }
      }

      function closeMessage() {
        var uploadInformation = document.querySelector('.' + message);
        uploadInformation.classList.add('visually-hidden');

        document.removeEventListener('click', onWindowClick);
        document.removeEventListener('keydown', onWindowEscPress);
      }

      var loadBlock = document.querySelector('.loading');
      loadBlock.classList.add('hidden');

      var uploadInformation = document.querySelector('.' + message);
      uploadInformation.classList.remove('visually-hidden');

      var uploadButton = uploadInformation.querySelector('.' + message + '__button');
      uploadButton.focus();

      document.addEventListener('click', onWindowClick);
      document.addEventListener('keydown', onWindowEscPress);
    },

    escPress: function (evt, cb) {
      if (evt.keyCode === window.constants.ESC_KEY
        && !evt.currentTarget.querySelector('.text__description:focus')
        && !evt.currentTarget.querySelector('.text__hashtags:focus')) {

        cb();
      }
    }
  };
})();
