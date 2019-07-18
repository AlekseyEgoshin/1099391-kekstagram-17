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

  // Функция для работы с кнопками фильтрации изображения
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

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.constants.ESC_KEY
      && !evt.currentTarget.querySelector('.text__description:focus')
      && !evt.currentTarget.querySelector('.text__hashtags')) {
      closePopup();
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

    // Вешаем обработчик на строку с хеш-тегами
    uploadHastTags.addEventListener('change', function (evt) {
      var currentValue = evt.target.value;
      if (currentValue) {
        var checkedTags = [];
        var hashTags = [];
        hashTags = currentValue.split(' ');
        // console.log(hashTags);
        var element = '#';
        // Проверяем длинну "слова" и наличие "#"
        for (var i = 0; i < hashTags.length; i++) {
          if (hashTags[i].indexOf(element) === 0) {
            // console.log(hashTags[i].length);
            // console.log(hashTags[i].toLowerCase());

            // Делаем проверку на существование похожего хеш-тега
            if (i === 0) {
              // console.log(3 + ' serv');
              checkedTags.push(hashTags[i]);
            } else {
              // console.log(checkedTags.indexOf(hashTags[i]));
              // console.log(checkedTags.indexOf(hashTags[i]) === -1);
              if (checkedTags.indexOf(hashTags[i]) === -1) {
                // console.log(4 + ' serv');
                checkedTags.push(hashTags[i]);
              } else {
                // console.log(5 + ' Есть похожий элемент');
                // Сообщение об ошибке
              }
            }
          } else {
            // console.log(0 + ' # не стоит на 1 месте');
          }
        }

      }

    });
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
