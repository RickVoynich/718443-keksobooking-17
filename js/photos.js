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

  var isFileMatchExt = function (file) {

    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var loadImage = function (file, callback) {

    if (isFileMatchExt(file)) {
      var reader = new FileReader();
      var onImageLoad = function () {
        callback(reader.result);
      };

      reader.addEventListener('load', onImageLoad);
      reader.readAsDataURL(file);
    }
  };

  var onAvatarChooserChange = function () {
    var file = avatarChooserElem.files[0];

    loadImage(file, function (imageSrc) {
      avatarPreviewElem.src = imageSrc;
    });
  };

  var onImageUploadChooserChange = function () {

    var file = imageUploadChooserElem.files[0];

    loadImage(file, function (imageSrc) {
      var img = document.createElement('img');
      imageUploadPreviewElem.appendChild(img);

      img.src = imageSrc;
      img.width = PHOTO_SIZE;
      img.height = PHOTO_SIZE;
      img.alt = PHOTO_ALT;
    });
  };

  var clearAvatar = function () {
    avatarPreviewElem.src = DEFAULT_AVATAR_SRC;
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
