'use strict';

// Все то, что отображается при загрузке файла
(function () {
  // Переменные для работы с увеличением/уменьшением картинки
  var uploadPreview = document.querySelector('.img-upload__preview');
  var uploadScale = document.querySelector('.img-upload__scale');
  var uploadPriviewImg = uploadPreview.querySelector('img');
  uploadPriviewImg.classList.add('resizing');
  var uploadScaleValue = uploadScale.querySelector('.scale__control--value');
  var uploadScaleReduction = uploadScale.querySelector('.scale__control--smaller');
  var uploadScaleIncrease = uploadScale.querySelector('.scale__control--bigger');

  // Переменные для работы с фильтрами
  var uploadPriviewPhoto = uploadPreview.querySelector('img');
  var listItem = document.querySelector('.effects__list');
  var uploadFileEffectNone = listItem.querySelector('#effect-none');
  var uploadFilterSlider = document.querySelector('.img-upload__effect-level');
  var uploadFilterSliderDot = uploadFilterSlider.querySelector('.effect-level__pin');
  var uploadFilterSliderLine = uploadFilterSlider.querySelector('.effect-level__depth');

  // Функция для расчета значений параметров полосы и точки слайдера
  function calculateParametrs(shift, filterName) {
    // Получаем значение из стилей и преобразуем в число
    var left = parseFloat(uploadFilterSliderDot.style.left);

    if ((left - shift) < window.constants.LINE_MIN_WIDTH || (left - shift) > window.constants.LINE_MAX_WIDTH) {
      shift = 0;
    }

    var valueDot = uploadFilterSliderDot.offsetLeft - shift;
    var valueLine = uploadFilterSliderLine.offsetWidth - shift;

    changeEffectsParametrs(valueDot, filterName);

    uploadFilterSliderDot.style.left = valueDot + 'px';
    uploadFilterSliderLine.style.width = valueLine + 'px';
  }

  function changeEffectsParametrs(val, filterName) {
    var uploadFilterSliderDotPosition = parseFloat(val).toFixed(2);
    var value;

    switch (filterName) {
      case 'effect-chrome':
        value = 'grayscale(' + (uploadFilterSliderDotPosition / window.constants.LINE_MAX_WIDTH).toFixed(3) + ')';
        break;
      case 'effect-sepia':
        value = 'sepia(' + (uploadFilterSliderDotPosition / window.constants.LINE_MAX_WIDTH).toFixed(3) + ')';
        break;
      case 'effect-marvin':
        value = 'invert(' + ((uploadFilterSliderDotPosition / window.constants.LINE_MAX_WIDTH) * window.constants.PERCENT_SCALE).toFixed(3) + '%)';
        break;
      case 'effect-phobos':
        value = 'blur(' + ((uploadFilterSliderDotPosition / window.constants.LINE_MAX_WIDTH) * 3).toFixed(3) + 'px)';
        break;
      case 'effect-heat':
        var result = ((uploadFilterSliderDotPosition / window.constants.LINE_MAX_WIDTH) * 3).toFixed(3);
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

  window.form = {
    onDefaulSizePhoto: function() {
      // Присваиваем стандартное значение в 100% и накладываем на кнопки слушателей
      uploadScaleValue.value = '100%';
      uploadScaleReduction.addEventListener('click', window.form.onRedictionPhoto);
      uploadScaleIncrease.addEventListener('click', window.form.onIncreasePhoto);
    },
    // Увеличение/уменьшение картинок
    onRedictionPhoto: function() {
      if (parseFloat(uploadScaleValue.value) > window.constants.MINIMUM_SCALE) {
        var newScale = (parseFloat(uploadScaleValue.value) - window.constants.STEP_SCALE);
        uploadScaleValue.value = newScale + '%';
        uploadPreview.querySelector('.resizing').style.transform = 'scale(' + (newScale / window.constants.PERCENT_SCALE) + ')';
      }
    },

    onIncreasePhoto: function() {
      if (parseFloat(uploadScaleValue.value) < window.constants.MAXIMUM_SCALE) {
        var newScale = (parseFloat(uploadScaleValue.value) + window.constants.STEP_SCALE);
        uploadScaleValue.value = newScale + '%';
        uploadPreview.querySelector('.resizing').style.transform = 'scale(' + (newScale / window.constants.PERCENT_SCALE) + ')';
      }
    },

    selectFilter: function(filterName) {
      // Выставляем значение ползунка на 100%
      uploadFilterSliderDot.style.left = window.constants.LINE_MAX_WIDTH + 'px';
      uploadFilterSliderLine.style.width = window.constants.LINE_MAX_WIDTH + 'px';
      changeEffectsParametrs(window.constants.LINE_MAX_WIDTH, filterName);

      function onSliderMouseDown(evt) {
        evt.preventDefault();

        // Перемещение происходит только по оси X
        var startCoordX = evt.clientX;

        function onSliderMouseMove(moveEvt) {
          moveEvt.preventDefault();

          var shift = startCoordX - moveEvt.clientX;

          startCoordX = moveEvt.clientX;

          calculateParametrs(shift, filterName);
        }

        function onSliderMouseUp(upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onSliderMouseMove);
          document.removeEventListener('mouseup', onSliderMouseUp);
        }

        document.addEventListener('mousemove', onSliderMouseMove);
        document.addEventListener('mouseup', onSliderMouseUp);
      }

      if (filterName === 'effect-none') {
        uploadFilterSlider.classList.add('hidden');
      } else {
        uploadFilterSlider.classList.remove('hidden');

        uploadFilterSliderDot.addEventListener('mousedown', onSliderMouseDown);

        // Отписываемся от обработчика при переключении на новый, не текущий, эффект
        listItem.addEventListener('click', function (evt) {
          if (evt.target.name !== filterName) {
            uploadFilterSliderDot.removeEventListener('mousedown', onSliderMouseDown);
          }
        }, {once: true});
      }
    },
  }
})();
