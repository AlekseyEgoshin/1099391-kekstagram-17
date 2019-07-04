'use strict';

// функция для отрисовки 1 изображения
(function () {
  // Функция для получения случайного числа исходя из длинны массива
  function getIndex(length) {
    return Math.floor(Math.random() * length);
  }

  // Функция для получения случайного числа из диапазона значений
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Функция для получения комментариев к фотографии
  function getCommentaries(expressions, names) {
    var comments = [];
    for (var j = 0; j < getIndex(window.constants.QUANTITY); j++) {
      comments[j] = {};
      comments[j].avatar = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
      comments[j].message = expressions[getIndex(expressions.length)];
      comments[j].name = names[getIndex(names.length)];
    }

    return comments;
  }

  window.picture = {
    getPhotos: function(expressions, names, min, max) {
      var photosData = [];
      for (var i = 0; i < window.constants.QUANTITY; i++) {
        photosData[i] = {};
        photosData[i].url = 'photos/' + (i + 1) + '.jpg';
        photosData[i].likes = getRandomInt(min, max);
        photosData[i].comments = getCommentaries(expressions, names);
      }

      return photosData;
    },

    // Функция для создания DOM-элемента
    getPhoto: function(photo, parentElement) {
      // Определяем шаблон, в который будем записывать данные
      var photoElement = parentElement.content.querySelector('.picture').cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      return photoElement;
    },
  }
})();
