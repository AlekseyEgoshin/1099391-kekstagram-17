'use strict';

(function () {
  // Переменные для работы с просмотром загруженной картинки
  var uploadPhoto = document.querySelector('#upload-file');
  var uploadPhotoSetting = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var uploadHastTags = uploadPhotoSetting.querySelector('.text__hashtags');

  // Переменные для работы с фильтрами
  var uploadPreviewPhoto = uploadPreview.querySelector('img');
  var listItem = document.querySelector('.effects__list');
  var uploadFileEffectNone = listItem.querySelector('#effect-none');
  var uploadFilterSlider = document.querySelector('.img-upload__effect-level');

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadInput = uploadForm.querySelector('.img-upload__input');

  uploadInput.addEventListener('input', window.preview.onChangePhoto);

  var main = document.querySelector('main');
  main.classList.add('root');

  window.utils.load();

  // Функция для работы с кнопками фильтрации изображения
  window.data.load(function (data) {
    data.forEach(function (element) {
      document.querySelector('.pictures').appendChild(window.gallery.get(element));
    });
    window.filters.unlock();

    var pictures = document.querySelector('.pictures');
    pictures.addEventListener('click', window.bigPicture.open);
    pictures.addEventListener('keydown', function (evt) {
      window.bigPicture.open(evt);
    });

    // Переменные для работы с кнопками переключения окон
    var filterPhoto = document.querySelector('.img-filters');
    var filterPhotos = filterPhoto.querySelector('.img-filters__form');

    filterPhotos.addEventListener('click', function (evt) {
      window.filters.set(evt, data);
    });
  });

  function onChangeEffect(evt) {
    var target = evt.target;
    if (target.name === 'effect') {
      window.form.selectFilter(target.id);
    }
  }

  function esc(evt) {
    window.utils.escPress(evt, closePopup);
  }

  function openPopup() {
    uploadPhotoSetting.classList.remove('hidden');
    uploadFileEffectNone.checked = true;
    uploadPreviewPhoto.style.filter = '';
    document.addEventListener('keydown', esc);

    window.form.onDefaulSizePhoto();

    uploadFilterSlider.classList.add('hidden');
    listItem.addEventListener('click', onChangeEffect);

    // Вешаем обработчик на строку с хеш-тегами
    uploadHastTags.addEventListener('blur', window.bigPicture.hashTags);

    // Обработчик на кнопку "ОТПРАВИТЬ"
    uploadForm.addEventListener('submit', function (evt) {
      window.data.send(new FormData(uploadForm), window.utils.status);
      evt.preventDefault();
      closePopup();
    });
  }

  function closePopup() {
    uploadPhotoSetting.classList.add('hidden');
    document.removeEventListener('keydown', esc);

    // Удаляем слушателей с кнопок при закрытии popup
    var uploadScale = document.querySelector('.img-upload__scale');

    uploadScale.removeEventListener('click', window.form.onChangeSize);
    listItem.removeEventListener('click', onChangeEffect);
  }

  uploadPhoto.addEventListener('change', openPopup);
  uploadCancel.addEventListener('click', closePopup);
  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEY) {
      closePopup();
    }
  });
})();
