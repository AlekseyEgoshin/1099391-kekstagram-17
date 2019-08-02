'use strict';

(function () {
  window.constants = {
    DEBOUNCE_INTERVAL: 500,

    QUANTITY: 25,
    PHOTOS_QUANTITY: 10,

    IMG_SIZE: 35,

    MINIMUM_SCALE: 25,
    MAXIMUM_SCALE: 100,
    STEP_SCALE: 25,
    PERCENT_SCALE: 100,
    LINE_MIN_WIDTH: 0,
    LINE_MAX_WIDTH: 453,

    EFFECTS_NAME: ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'],

    COMMENTS_MIN: 5,
    COMMENTS_STEP: 5,


    ENTER_KEY: 13,
    ESC_KEY: 27,

    SUCCESS_OK: 200,

    READYSTATE_DONE: 4,
    VALIDATION_ERRORS: {
      MAX_QUANTITY: 'Количество хеш-тегов не должно быть больше 5.',
      SAME_ITEM: 'Хеш-теги не должны повторяться.',
      NOT_FIRST: 'Хеш-тег должен распологаться на первой позиции.',
      MAX_LENGTH: 'Длина хеш-тега должна быть меньше 20 символов(включая символ "#").',
      MIN_LENGTH: 'Хеш-тег не может состоять только из символа "#".',
    },
  };
})();
