'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';
  var STATUS = 200;
  var TIMEOUT = 10000;

  var createXhr = function (method, url, onSuccess, onError, data) {
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

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);

    if (method === METHOD_GET) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  };

  var load = function (onSuccess, onError) {
    createXhr(METHOD_GET, URL_GET, onSuccess, onError);
  };

  var save = function (data, onSuccess, onError) {
    createXhr(METHOD_POST, URL_POST, onSuccess, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
