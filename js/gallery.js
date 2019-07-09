'use strict';

(function () {

  // функция для генерации всех фотографий
  window.gallery = {
    getDomElements: function (element) {
      // TODO : По заданнию добавить описание к фотографии с хэш-тегами 'element.description'
      var photo = window.picture.getPhotos(element.url, element.likes, element.comments);
      var photoTemplate = document.querySelector('#picture');
      var fragment = document.createDocumentFragment();

      fragment.appendChild(window.picture.getPhoto(photo, photoTemplate));

      return fragment;
    }
  };
})();
