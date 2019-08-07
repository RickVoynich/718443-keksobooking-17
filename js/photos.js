'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_SIZE = 65;
  var PHOTO_ALT = 'Фотография жилья';
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var adFormContainerElem = document.querySelector('.ad-form');
  var avatarChooserElem = adFormContainerElem.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreviewElem = adFormContainerElem.querySelector('.ad-form-header__preview img');
  var imageUploadChooserElem = adFormContainerElem.querySelector('.ad-form__upload input[type=file]');
  var imageUploadPreviewElem = adFormContainerElem.querySelector('.ad-form__photo');

  var onAvatarChooserChange = function () {
    var file = avatarChooserElem.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElem.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var clearAvatar = function () {
    avatarPreviewElem.src = DEFAULT_AVATAR_SRC;
  };

  var onImageUploadChooserChange = function () {
    var file = imageUploadChooserElem.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var img = document.createElement('img');
      imageUploadPreviewElem.appendChild(img);

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
        img.width = PHOTO_SIZE;
        img.height = PHOTO_SIZE;
        img.alt = PHOTO_ALT;
      });

      reader.readAsDataURL(file);
    }
  };

  var clearPreviewImages = function () {
    Array.from(imageUploadPreviewElem.querySelectorAll('img'))
      .forEach(function (item) {
        item.remove();
      });
  };

  avatarChooserElem.addEventListener('change', onAvatarChooserChange);
  imageUploadChooserElem.addEventListener('change', onImageUploadChooserChange);

  window.photos = {
    clearAvatar: clearAvatar,
    clearPreviewImages: clearPreviewImages
  };

})();
