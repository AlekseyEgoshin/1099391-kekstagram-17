'use strict';

(function () {
  var uploadHastTags = document.querySelector('.text__hashtags');

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.constants.ESC_KEY && !evt.currentTarget.querySelector('.text__description:focus')) {
      onBigPictureClose();
    }
  }

  function clearingUlBlock() {
    var deletedElement = document.querySelector('.social__comments');

    while (deletedElement.firstChild) {
      deletedElement.removeChild(deletedElement.firstChild);
    }
  }

  function onBigPictureClose() {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');

    var cancelButton = document.querySelector('.big-picture__cancel');
    cancelButton.removeEventListener('click', onBigPictureClose);

    document.removeEventListener('keydown', onPopupEscPress);
  }

  function createCommentaries(data) {
    var creatingElementLi = document.createElement('li');
    creatingElementLi.classList.add('social__comment');

    var creatingElementImg = document.createElement('img');
    creatingElementImg.classList.add('social__picture');
    creatingElementImg.src = data.avatar;
    creatingElementImg.alt = data.name;
    creatingElementImg.width = window.constants.IMG_SIZE;
    creatingElementImg.height = window.constants.IMG_SIZE;
    creatingElementImg.alt = data.name;

    var creatingElementParagraph = document.createElement('p');
    creatingElementParagraph.classList.add('social__text');
    creatingElementParagraph.textContent = data.message;

    creatingElementLi.appendChild(creatingElementImg);
    creatingElementLi.appendChild(creatingElementParagraph);

    return creatingElementLi;
  }

  function insertCommentary(initValue, lastValue, data) {
    var commentaries = [];
    for (var i = initValue; i < lastValue; i++) {
      commentaries[i] = createCommentaries(data.comments[i]);
      document.querySelector('.social__comments').appendChild(commentaries[i]);
    }
  }

  window.bigPicture = {
    onBigPictureOpen: function (evt) {
      function onCommentsClick() {
        var commentaryCount = document.querySelector('.social__comment-count').innerHTML;
        var commentaryPhrases = commentaryCount.split(' ');

        var startingCount = parseFloat(commentaryPhrases[0]);

        if (data[number].comments.length <= (parseFloat(commentaryPhrases[0]) + 5)) {
          insertCommentary(startingCount, data[number].comments.length, data[number]);
          commentaryPhrases[0] = data[number].comments.length;

          commentsLoader.classList.add('visually-hidden');
          commentsLoader.removeEventListener('click', onCommentsClick);
        } else {
          insertCommentary(startingCount, (startingCount + window.constants.COMMENTS_STEP), data[number]);
          commentaryPhrases[0] = parseFloat(commentaryPhrases[0]) + window.constants.COMMENTS_STEP;
        }

        document.querySelector('.social__comment-count').innerHTML = commentaryPhrases.join(' ');
      }

      var choosenImg = false;
      if (evt.keyCode === window.constants.ENTER_KEY) {
        choosenImg = evt.target.children[0];
      }

      // Левый блок проверки - при клике, правый - при нажатии ENTER
      if (evt.target.classList.contains('picture__img') || choosenImg) {
        evt.preventDefault();
        if (evt.target.dataset.adr || choosenImg.dataset.adr) {
          var dataset;
          if (choosenImg) {
            dataset = (evt.target.children[0].dataset.adr + '').split('/');
          } else {
            dataset = (evt.target.dataset.adr + '').split('/');
          }
          var number = parseFloat(dataset[1]) - 1;

          var bigPicture = document.querySelector('.big-picture');
          bigPicture.classList.remove('hidden');

          clearingUlBlock();

          var data = window.data.get();

          bigPicture.querySelector('.big-picture__img').querySelector('img').src = data[number].url;
          bigPicture.querySelector('.likes-count').textContent = data[number].likes;
          bigPicture.querySelector('.comments-count').textContent = data[number].comments.length;
          bigPicture.querySelector('.social__caption').textContent = data[number].description;

          var commentsLoader = document.querySelector('.comments-loader');
          var commentaryCount = document.querySelector('.social__comment-count').innerHTML;
          var commentaryPhrases = commentaryCount.split(' ');

          if (data[number].comments.length <= window.constants.COMMENTS_MIN) {
            commentaryPhrases[0] = data[number].comments.length;

            insertCommentary(0, data[number].comments.length, data[number]);
            commentsLoader.classList.add('visually-hidden');

          } else {
            if (commentaryPhrases[0] !== 5) {
              commentaryPhrases[0] = window.constants.COMMENTS_STEP;

              if (commentsLoader.classList.contains('visually-hidden')) {
                commentsLoader.classList.remove('visually-hidden');
              }
            }
            insertCommentary(0, parseFloat(commentaryPhrases[0]), data[number]);
            commentsLoader.addEventListener('click', onCommentsClick);
          }
          document.querySelector('.social__comment-count').innerHTML = commentaryPhrases.join(' ');
        }

        var cancelButton = document.querySelector('.big-picture__cancel');
        cancelButton.addEventListener('click', onBigPictureClose);
        document.addEventListener('keydown', onPopupEscPress);
      }
    },

    onHashtagsCheck: function (evt) {
      var currentValue = evt.target.value;
      // Проверяется, изменена ли была строка
      if (currentValue) {
        var checkedTags = [];
        var hashTags = [];
        var errors = [];
        var errorMessage = '';
        hashTags = currentValue.split(' ');
        var element = '#';

        // Проверяем количество хэш-тегов в инпуте
        if (hashTags.length > 5) {
          errors.push('MAX_QUANTITY');
        }

        // Проверяем длинну "слова" и наличие "#"
        for (var i = 0; i < hashTags.length; i++) {
          var hastTag = hashTags[i].toLowerCase();

          // Проверяем, стоит ли на первом месте "#"
          if (hastTag.indexOf(element) === 0) {
            // Проверка, является ли # единственным элементом
            if (hastTag.length === 1 && (errors.indexOf('MIN_LENGTH') === -1)) {
              errors.push('MIN_LENGTH');
            } else if (hastTag.length > 20 && (errors.indexOf('MAX_LENGTH') === -1)) {
              errors.push('MAX_LENGTH');
            }
          } else {
            errors.push('NOT_FIRST');
          }

          // Делаем проверку на существование похожего хеш-тега
          if (!errors.sameItem) {
            if (i === 0) {
              checkedTags.push(hastTag);
            } else {
              if (checkedTags.indexOf(hastTag) === -1) {
                checkedTags.push(hastTag);
              } else if (errors.indexOf('SAME_ITEM') === -1) {
                errors.push('SAME_ITEM');
              }
            }
          }
        }

        if (errors.length) {
          for (var j = 0; j < errors.length; j++) {
            var err = errors[j];
            errorMessage += (window.constants.VALIDATION_ERRORS[err] + ' \n');
          }
          uploadHastTags.style.borderColor = '#FF0000';
          uploadHastTags.setCustomValidity(errorMessage);
        } else {
          uploadHastTags.setCustomValidity('');
          uploadHastTags.style.borderColor = 'rgb(238, 238, 238)';
        }
      }
    }
  };
})();
