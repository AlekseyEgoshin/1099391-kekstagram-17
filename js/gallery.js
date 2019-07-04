'use strict';

(function () {

  // функция для генерации всех фотографий
  function getDomElements() {
    var photo = window.picture.getPhotos(window.data.EXPRESSIONS, window.data.NAMES, window.constants.MINMIMUM_LIKES, window.constants.MAXIMUM_LIKES);
    var photoTemplate = document.querySelector('#picture');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.constants.QUANTITY; i++) {
      fragment.appendChild(window.picture.getPhoto(photo[i], photoTemplate));
    }

    return fragment;
  }

  document.querySelector('.pictures').appendChild(getDomElements());
})();
