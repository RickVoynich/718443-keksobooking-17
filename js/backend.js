'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      var main = document.querySelector('main');
      var notice = document.querySelector('.notice');

      var errorMessage = document.querySelector('#error')
        .content
        .querySelector('.error')
        .cloneNode(true);

      main.insertBefore(errorMessage, notice);
    });

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
