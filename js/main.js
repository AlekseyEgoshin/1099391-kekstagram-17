'use strict';

(function () {

  window.data.load(function (data) {
    data.forEach(function (element) {
      document.querySelector('.pictures').appendChild(window.gallery.getDomElements(element));
    });
    window.filters.unlock();

    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (photo) {
      photo.addEventListener('click', window.bigPicture.openBigPicture);
    });

    // Переменные для работы с кнопками переключения окон
    var filterPhoto = document.querySelector('.img-filters');
    var popularPhoto = filterPhoto.querySelector('#filter-popular');
    var newPhoto = filterPhoto.querySelector('#filter-new');
    var discussedPhoto = filterPhoto.querySelector('#filter-discussed');

    function setFilter(evt) {
      window.filters.deletePictures();

      var buttonHover = 'img-filters__button--active';
      document.querySelector('.' + buttonHover).classList.remove(buttonHover);
      document.querySelector('#' + evt.currentTarget.id).classList.add(buttonHover);

      switch (evt.currentTarget.id) {
        case 'filter-popular':
          data.forEach(function (element) {
            document.querySelector('.pictures').appendChild(window.gallery.getDomElements(element));
          });
          break;
        case 'filter-new':
          var newData = data.slice().sort(function () {
            return Math.random() - 0.5;
          });
          for (var i = 0; i < window.constants.PHOTOS_QUANTITY; i++) {
            var el = newData[i];
            document.querySelector('.pictures').appendChild(window.gallery.getDomElements(el));
          }
          break;
        case 'filter-discussed':
          var discussData = window.filters.sort(data);

          discussData.forEach(function (element) {
            document.querySelector('.pictures').appendChild(window.gallery.getDomElements(element));
          });
          break;
      }
    }

    popularPhoto.addEventListener('click', setFilter);
    newPhoto.addEventListener('click', setFilter);
    discussedPhoto.addEventListener('click', setFilter);
  });

  var uploadPhoto = document.querySelector('#upload-file');
  var uploadPhotoSetting = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadPreview = document.querySelector('.img-upload__preview');

  // // Переменные для работы с фильтрами
  var uploadPreviewPhoto = uploadPreview.querySelector('img');
  var listItem = document.querySelector('.effects__list');
  var uploadFileEffectNone = listItem.querySelector('#effect-none');
  var uploadFilterSlider = document.querySelector('.img-upload__effect-level');

  function onChangeEffect(evt) {
    var target = evt.target;
    if (target.name === 'effect') {
      window.form.selectFilter(target.id);
    }
  }

  function openPopup() {
    uploadPhotoSetting.classList.remove('hidden');
    uploadFileEffectNone.checked = true;
    uploadPreviewPhoto.style.filter = '';
    document.addEventListener('keydown', onPopupEscPress);

    window.form.onDefaulSizePhoto();

    uploadFilterSlider.classList.add('hidden');
    listItem.addEventListener('click', onChangeEffect);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.constants.ESC_KEY
      && !evt.currentTarget.querySelector('.text__description:focus')
      && !evt.currentTarget.querySelector('.text__hashtags')) {
      closePopup();
    }
  }

  function closePopup() {
    uploadPhotoSetting.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);

    // Удаляем слушателей с кнопок при закрытии popup
    var uploadScale = document.querySelector('.img-upload__scale');
    var uploadScaleReduction = uploadScale.querySelector('.scale__control--smaller');
    var uploadScaleIncrease = uploadScale.querySelector('.scale__control--bigger');

    uploadScaleReduction.removeEventListener('click', window.form.onRedictionPhoto);
    uploadScaleIncrease.removeEventListener('click', window.form.onIncreasePhoto);
    listItem.removeEventListener('click', onChangeEffect);
  }

  uploadPhoto.addEventListener('change', openPopup);

  uploadCancel.addEventListener('click', closePopup);
})();
