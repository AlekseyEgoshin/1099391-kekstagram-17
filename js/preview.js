'use strict';

(function () {
  window.preview = {
    onChangePhoto: function () {
      var input = document.querySelector('.img-upload__input');

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          var result = evt.target.result;
          document.querySelector('.resizing').src = result;
          var effects = document.querySelectorAll('.effects__radio');
          for (var i = 0; i < effects.length; i++) {
            var choosenEffect = document.querySelector('.effects__preview--' + effects[i].value);
            choosenEffect.style.backgroundImage = 'url(' + result + ')';
          }
        });

        reader.readAsDataURL(input.files[0]);
      }
    }
  };
})();
