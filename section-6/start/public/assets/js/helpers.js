// add Promise polyfill to window
if (!window.Promise) {
  window.Promise = Promise;
}

var helpers = (function() {
  // get Query params
  var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  // get Hash
  var getHashByName = function(name) {
    var hash = window.location.hash;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[#&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(hash);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  // Format date
  var formatDate = function(date) {
    return (
      date.getUTCFullYear() +
      '/' +
      ('0' + (date.getUTCMonth() + 1)).slice(-2) +
      '/' +
      ('0' + date.getUTCDate()).slice(-2) +
      ' ' +
      ('0' + date.getUTCHours()).slice(-2) +
      ':' +
      ('0' + date.getUTCMinutes()).slice(-2) +
      ':' +
      ('0' + date.getUTCSeconds()).slice(-2)
    );
  };

  // Show snackBarMessage
  var showMessage = function(msg) {
    var notification = document.querySelector('#notification');
    var data = {
      message: msg,
      timeout: 2000,
    };
    notification.MaterialSnackbar.showSnackbar(data);
  };

  return {
    showMessage: showMessage,
    formatDate: formatDate,
    getParameterByName: getParameterByName,
    getHashByName: getHashByName,
  };
})();
