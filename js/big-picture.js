'use strict';

(function () {
  function onPopupEscPress(evt) {
    if (evt.keyCode === window.constants.ESC_KEY && !evt.currentTarget.querySelector('.text__description:focus')) {
      closeBigPicture();
    }
  }

  function clearingUlBlock() {
    var deletedElement = document.querySelector('.social__comments');

    while (deletedElement.firstChild) {
      deletedElement.removeChild(deletedElement.firstChild);
    }
  }

  function closeBigPicture() {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');

    var cancelButton = document.querySelector('.big-picture__cancel');
    cancelButton.addEventListener('click', closeBigPicture);

    document.removeEventListener('keydown', onPopupEscPress);
  }

  function createCommentaries(text) {
    var creatingElementLi = document.createElement('li');
    creatingElementLi.classList.add('social__comment');

    var creatingElementImg = document.createElement('img');
    creatingElementImg.classList.add('social__picture');
    creatingElementImg.src = text.avatar;
    creatingElementImg.alt = text.name;
    creatingElementImg.width = window.constants.IMG_SIZE;
    creatingElementImg.height = window.constants.IMG_SIZE;
    creatingElementImg.alt = text.name;

    var creatingElementParagraph = document.createElement('p');
    creatingElementParagraph.classList.add('social__text');
    creatingElementParagraph.textContent = text.message;

    creatingElementLi.appendChild(creatingElementImg);
    creatingElementLi.appendChild(creatingElementParagraph);

    return creatingElementLi;
  }

  window.bigPicture = {
    openBigPicture: function (evt) {
      evt.preventDefault();
      if (evt.target.dataset.adr) {
        var dataset = (evt.target.dataset.adr + '').split('/');
        var number = parseFloat(dataset[1]) - 1;

        var bigPicture = document.querySelector('.big-picture');
        bigPicture.classList.remove('hidden');

        var commentsLoader = document.querySelector('.comments-loader');
        commentsLoader.classList.add('visually-hidden');

        clearingUlBlock();

        var data = window.data.getPhotos();

        bigPicture.querySelector('.big-picture__img').querySelector('img').src = data[number].url;
        bigPicture.querySelector('.likes-count').textContent = data[number].likes;
        bigPicture.querySelector('.comments-count').textContent = data[number].comments.length;
        bigPicture.querySelector('.social__caption').textContent = data[number].description;

        // Создаем массив для последнего задания
        var commentaries = [];
        for (var i = 0; i < data[number].comments.length; i++) {
          commentaries[i] = createCommentaries(data[number].comments[i]);
          document.querySelector('.social__comments').appendChild(commentaries[i]);
        }
      }

      var cancelButton = document.querySelector('.big-picture__cancel');
      cancelButton.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', onPopupEscPress);
    },
  };
})();
