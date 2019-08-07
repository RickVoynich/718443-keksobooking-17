'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var GET_METHOD = 'GET';
  var POST_METHOD = 'POST';
  var STATUS = 200;

  var createXhr = function (method, url,onSuccess, onError, data ) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', onError);

    xhr.open(method, url);

    if (method === GET_METHOD) {
      xhr.send()
    } else {
      xhr.send(data);
    }
  };

  var load = function (onSuccess, onError) {
    createXhr(GET_METHOD, GET_URL, onSuccess, onError);
  };

  var save = function (data, onSuccess, onError) {
    createXhr(POST_METHOD, POST_URL,  onSuccess, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
