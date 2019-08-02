'use strict';

(function () {

  // функция для генерации всех фотографий
  window.gallery = {
    get: function (element) {
      var photo = window.picture.createPhoto(element.url, element.likes, element.comments, element.description);
      var photoTemplate = document.querySelector('#picture');
      var fragment = document.createDocumentFragment();

      fragment.appendChild(window.picture.getPhoto(photo, photoTemplate));

      return fragment;
    }
  };
})();
