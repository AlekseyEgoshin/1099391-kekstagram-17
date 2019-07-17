'use strict';

(function () {
  var lastTimeout;

  window.utils = {
    debounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, window.constants.DEBOUNCE_INTERVAL);
    }
  };
})();
