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

// We have already imported IDB to wrap indexedDb with promise
var db_helpers = (function() {
  var DB_NAME = 'pwa-note-db';
  var TABLE_NAME = 'notes';

  var dbPromise = idb.open(DB_NAME, 1, function(db) {
    if (!db.objectStoreNames.contains(TABLE_NAME)) {
      db.createObjectStore(TABLE_NAME, { keyPath: 'id' });
    }
  });

  var getNote = function(id) {
    return dbPromise.then(function(db) {
      var tx = db.transaction(TABLE_NAME, 'readwrite');
      var store = tx.objectStore(TABLE_NAME);
      return store.get(Number(id));
    });
  };

  var writeNote = function(data, id) {
    return dbPromise.then(function(db) {
      var tx = db.transaction(TABLE_NAME, 'readwrite');
      var store = tx.objectStore(TABLE_NAME);
      store.put(data);
      return tx.complete;
    });
  };

  var readAllNote = function() {
    return dbPromise.then(function(db) {
      var tx = db.transaction(TABLE_NAME, 'readonly');
      var store = tx.objectStore(TABLE_NAME);
      return store.getAll();
    });
  };

  var deleteNote = function(id) {
    return dbPromise.then(function(db) {
      var tx = db.transaction(TABLE_NAME, 'readwrite');
      var store = tx.objectStore(TABLE_NAME);
      store.delete(Number(id));
      return tx.complete;
    });
  };

  var clearAll = function() {
    return dbPromise.then(function(db) {
      var tx = db.transaction(TABLE_NAME, 'readwrite');
      var store = tx.objectStore(TABLE_NAME);
      store.clear();
      return tx.complete;
    });
  };

  return {
    getNote: getNote,
    writeNote: writeNote,
    readAllNote: readAllNote,
    clearAll: clearAll,
    deleteNote: deleteNote,
  };
})();
