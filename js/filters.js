'use strict';

(function () {
  var gallery = document.querySelector('.pictures');

  function deletePictures() {
    var childs = document.querySelectorAll('.picture');
    for (var i = 0; i < childs.length; i++) {
      childs[i].parentNode.removeChild(childs[i]);
    }
  }

  function sort(data) {
    var popularPhotos = data.slice().sort(function (prevPhoto, nextPhoto) {
      return prevPhoto.comments.length < nextPhoto.comments.length ? 1 : -1;
    });
    return popularPhotos;
  }

  function filterPop(data) {
    deletePictures();
    data.forEach(function (element) {
      gallery.appendChild(window.gallery.get(element));
    });
  }

  function filterNew(data) {
    deletePictures();
    var newData = data.slice().sort(function () {
      return Math.random() - 0.5;
    });
    for (var i = 0; i < window.constants.PHOTOS_QUANTITY; i++) {
      var photo = newData[i];
      gallery.appendChild(window.gallery.get(photo));
    }
  }

  function filterDisc(data) {
    deletePictures();
    var discussData = sort(data);

    discussData.forEach(function (element) {
      gallery.appendChild(window.gallery.get(element));
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
      var target = evt.target;

      if (!target.classList.contains('img-filters__button')) {
        return false;
      }

      var buttonHoverClassName = 'img-filters__button--active';
      document.querySelector('.' + buttonHoverClassName).classList.remove(buttonHoverClassName);
      document.querySelector('#' + target.id).classList.add(buttonHoverClassName);

      switch (target.id) {
        case 'filter-popular':
          window.utils.debounce(function () {
            filterPop(data);
          });
          break;
        case 'filter-new':
          window.utils.debounce(function () {
            filterNew(data);
          });
          break;
        case 'filter-discussed':
          window.utils.debounce(function () {
            filterDisc(data);
          });
          break;
      }
      return true;
    },
  };
})();
