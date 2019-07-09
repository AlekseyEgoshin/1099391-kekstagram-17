'use strict';

(function () {
  window.filters = {
    unlock: function () {
      var filterPhoto = document.querySelector('.img-filters');
      if (filterPhoto.classList.contains('img-filters--inactive')) {
        filterPhoto.classList.remove('img-filters--inactive');

        filterPhoto.querySelector('#filter-popular').addEventListener('click', window.filters.deletePictures);
      }
    },

    sort: function (data) {
      var popularPhotos = data.slice().sort(function (prevPhoto, nextPhoto) {
        return prevPhoto.comments.length < nextPhoto.comments.length ? 1 : -1;
      });
      return popularPhotos;
    },

    deletePictures: function () {
      var childs = document.querySelectorAll('.picture');
      for (var i = 0; i < childs.length; i++) {
        childs[i].parentNode.removeChild(childs[i]);
      }
    }
  };
})();
