'use strict';

// Константы
var QUANTITY = 25;
var MINMIMUM_LIKES = 15;
var MAXIMUM_LIKES = 100;
var MINIMUM_SCALE = 25;
var MAXIMUM_SCALE = 100;
var STEP_SCALE = 25;
var PERCENT_SCALE = 100;
var LINE_WIDTH = 453;

var ESC_KEY = 27;
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

// Модуль 4, задание 2
var uploadPhoto = document.querySelector('#upload-file');
var uploadPhotoSetting = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');
var uploadPreview = document.querySelector('.img-upload__preview');

// Переменные для работы с увеличением/уменьшением картинки
var uploadScale = document.querySelector('.img-upload__scale');
var uploadPriviewImg = uploadPreview.querySelector('img');
uploadPriviewImg.classList.add('resizing');
var uploadScaleValue = uploadScale.querySelector('.scale__control--value');
var uploadScaleReduction = uploadScale.querySelector('.scale__control--smaller');
var uploadScaleIncrease = uploadScale.querySelector('.scale__control--bigger');

// Переменные для работы с фильтрами
var uploadPriviewPhoto = uploadPreview.querySelector('img');
var listItem = document.querySelector('.effects__list');
var uploadFilterSlider = document.querySelector('.img-upload__effect-level');
var uploadFilterSliderDot = uploadFilterSlider.querySelector('.effect-level__pin');
// var uploadFilterSliderLine = uploadFilterSlider.querySelector('.effect-level__line');

// Переменные для работы с полями инпут
var uploadCommentary = document.querySelector('.text__description');

//  var uploadPin = document.querySelector('.effect-level__pin');

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEY && !evt.currentTarget.querySelector('.text__description:focus')) {
    closePopup();
  }
}

function onChangeEffect(evt) {
  var target = evt.target;
  if (target.name === 'effect') {
    selectFilter(target.id);
  }
}

function selectFilter(filterName) {
  // Выставляем значение ползунка на 100%
  // uploadFilterSliderDot.style.left = '100%';
  // uploadFilterSliderLine.style.width = '100%';
  uploadFilterSlider.classList.remove('hidden');

  var uploadFilterSliderDotPosition = parseFloat(getComputedStyle(uploadFilterSliderDot).left).toFixed(2);
  var value;

  switch (filterName) {
    case 'effect-chrome':
      value = 'grayscale(' + (uploadFilterSliderDotPosition / LINE_WIDTH).toFixed(3) + ')';
      break;
    case 'effect-sepia':
      value = 'sepia(' + (uploadFilterSliderDotPosition / LINE_WIDTH).toFixed(3) + ')';
      break;
    case 'effect-marvin':
      value = 'invert(' + ((uploadFilterSliderDotPosition / LINE_WIDTH) * 100).toFixed(3) + '%)';
      break;
    case 'effect-phobos':
      value = 'blur(' + ((uploadFilterSliderDotPosition / LINE_WIDTH) * 3).toFixed(3) + 'px)';
      break;
    case 'effect-heat':
      var result = ((uploadFilterSliderDotPosition / LINE_WIDTH) * 3).toFixed(3);
      if (result < 1) {
        result = 1;
      }
      value = 'brightness(' + result + ')';
      break;
    default:
      uploadFilterSlider.classList.add('hidden');
      value = 'none';
      break;
  }

  uploadPriviewPhoto.style.filter = value;
}

function openPopup() {
  uploadPhotoSetting.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

  // Присваиваем стандартное значение в 100% и накладываем на кнопки слушателей
  uploadScaleValue.value = '100%';
  uploadScaleReduction.addEventListener('click', onRedictionPhoto);
  uploadScaleIncrease.addEventListener('click', onIncreasePhoto);

  uploadFilterSlider.classList.add('hidden');
  listItem.addEventListener('click', onChangeEffect);
}

function closePopup() {
  uploadPhotoSetting.classList.add('hidden');
  document.removeEventListener('click', onPopupEscPress);
  // Удаляем слушателей с кнопок при закрытии popup
  uploadScaleReduction.removeEventListener('click', onRedictionPhoto);
  uploadScaleIncrease.removeEventListener('click', onIncreasePhoto);
  listItem.removeEventListener('click', onChangeEffect);
  uploadPhoto.value = '';
}

uploadPhoto.addEventListener('change', openPopup);

uploadCancel.addEventListener('click', closePopup);

function onRedictionPhoto() {
  if (parseFloat(uploadScaleValue.value) > MINIMUM_SCALE) {
    var newScale = (parseFloat(uploadScaleValue.value) - STEP_SCALE);
    uploadScaleValue.value = newScale + '%';
    uploadPreview.querySelector('.resizing').style.transform = 'scale(' + (newScale / PERCENT_SCALE) + ')';
  }
}

function onIncreasePhoto() {
  if (parseFloat(uploadScaleValue.value) < MAXIMUM_SCALE) {
    var newScale = (parseFloat(uploadScaleValue.value) + STEP_SCALE);
    uploadScaleValue.value = newScale + '%';
    uploadPreview.querySelector('.resizing').style.transform = 'scale(' + (newScale / PERCENT_SCALE) + ')';
  }
}
