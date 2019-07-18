'use strict';

(function () {
  var asd = document.querySelector('.pictures');

  function deletePictures() {
    var childs = document.querySelectorAll('.picture');
    for (var i = 0; i < childs.length; i++) {
      childs[i].parentNode.removeChild(childs[i]);
    }
  }

  function filterPop(data) {
    deletePictures();
    data.forEach(function (element) {
      asd.appendChild(window.gallery.getDomElements(element));
    });
  }

  function filterNew(data) {
    deletePictures();
    var newData = data.slice().sort(function () {
      return Math.random() - 0.5;
    });
    for (var i = 0; i < window.constants.PHOTOS_QUANTITY; i++) {
      var el = newData[i];
      asd.appendChild(window.gallery.getDomElements(el));
    }
  }

  function filterDisc(data) {
    deletePictures();
    var discussData = window.filters.sort(data);

    discussData.forEach(function (element) {
      asd.appendChild(window.gallery.getDomElements(element));
    });
  }

  window.filters = {
    unlock: function () {
      var filterPhoto = document.querySelector('.img-filters');
      if (filterPhoto.classList.contains('img-filters--inactive')) {
        filterPhoto.classList.remove('img-filters--inactive');
      }
    },

    set: function (evt, data) {
      var buttonHoverClassName = 'img-filters__button--active';
      document.querySelector('.' + buttonHoverClassName).classList.remove(buttonHoverClassName);
      document.querySelector('#' + evt.target.id).classList.add(buttonHoverClassName);

      switch (evt.target.id) {
        case 'filter-popular':
          window.utils.debounce(filterPop(data));
          break;
        case 'filter-new':
          window.utils.debounce(filterNew(data));
          break;
        case 'filter-discussed':
          window.utils.debounce(filterDisc(data));
          break;
      }
    },

    sort: function (data) {
      var popularPhotos = data.slice().sort(function (prevPhoto, nextPhoto) {
        return prevPhoto.comments.length < nextPhoto.comments.length ? 1 : -1;
      });
      return popularPhotos;
    },
  };
})();
