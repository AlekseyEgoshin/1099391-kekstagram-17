'use strict';

// функция для отрисовки 1 изображения
(function () {
  // Функция для получения комментариев к фотографии
  function getCommentaries(comments) {
    var commentaries = [];
    for (var j = 0; j < comments.length; j++) {
      commentaries[j] = {};
      commentaries[j].avatar = comments[j].avatar;
      commentaries[j].message = comments[j].message;
      commentaries[j].name = comments[j].name;
    }

    return commentaries;
  }

  window.picture = {
    // TODO : По заданнию добавить описание к фотографии с хэш-тегами 'description'
    getPhotos: function (url, likes, comments) {
      var photosData = {};
      photosData.url = url;
      photosData.likes = likes;
      photosData.comments = getCommentaries(comments);

      return photosData;
    },

    // Функция для создания DOM-элемента
    getPhoto: function (photo, parentElement) {
      // Определяем шаблон, в который будем записывать данные
      var photoElement = parentElement.content.querySelector('.picture').cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      return photoElement;
    },
  };
})();