'use strict';

(function () {

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
    if (evt.keyCode === window.constants.ESC_KEY && !evt.currentTarget.querySelector('.text__description:focus')) {
      closePopup();
    }
  }

  function closePopup() {
    uploadPhotoSetting.classList.add('hidden');
    document.removeEventListener('click', onPopupEscPress);

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
