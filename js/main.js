'use strict';

// Константы
var QUANTITY = 25;
var MINMIMUM_LIKES = 15;
var MAXIMUM_LIKES = 100;
var EXPRESSIONS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Азат',
  'Артем',
  'Алексей',
  'Андрей',
  'Айрат',
  'Данил',
  'Тимур',
  'Лиана',
  'Николай',
  'Константин',
  'Валерий',
  'Дмитрий',
  'Людмила',
  'Борис',
  'Лена',
  'Ксения',
];

// Функция для получения случайного числа исходя из длинны массива
function getIndex(length) {
  return Math.floor(Math.random() * length);
}

// Функция для получения случайного числа из диапазона значений
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPhotos(expressions, names, min, max) {
  var photosData = [];
  for (var i = 0; i < QUANTITY; i++) {
    photosData[i] = {};
    photosData[i].url = 'photos/' + (i + 1) + '.jpg';
    photosData[i].likes = getRandomInt(min, max);
    photosData[i].comments = getCommentaries(expressions, names);
  }

  return photosData;
}

// Функция для получения комментариев к фотографии
function getCommentaries(expressions, names) {
  var comments = [];
  for (var j = 0; j < getIndex(QUANTITY); j++) {
    comments[j] = {};
    comments[j].avatar = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    comments[j].message = expressions[getIndex(expressions.length)];
    comments[j].name = names[getIndex(names.length)];
  }

  return comments;
}

// Функция для создания DOM-элемента
function getPhoto(photo, parentElement) {
  // Определяем шаблон, в который будем записывать данные
  var photoElement = parentElement.content.querySelector('.picture').cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
}

function getDomElements() {
  var photo = getPhotos(EXPRESSIONS, NAMES, MINMIMUM_LIKES, MAXIMUM_LIKES);
  var photoTemplate = document.querySelector('#picture');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < QUANTITY; i++) {
    fragment.appendChild(getPhoto(photo[i], photoTemplate));
  }

  return fragment;
}

document.querySelector('.pictures').appendChild(getDomElements());
