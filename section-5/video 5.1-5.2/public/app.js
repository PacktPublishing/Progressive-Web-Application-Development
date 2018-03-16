var DB_NAME = 'pwa-note-db';
var TABLE_NAME = 'notes';

var dbPromise = idb.open(DB_NAME, 1, function (db) {
  if (!db.objectStoreNames.contains(TABLE_NAME)) {
    db.createObjectStore(TABLE_NAME, {
      keyPath: 'id'
    });
  }
});

var writeNote = function (data) {
  return dbPromise.then(function (db) {
    var tx = db.transaction(TABLE_NAME, 'readwrite');
    var store = tx.objectStore(TABLE_NAME);
    store.put(data);
    return tx.complete;
  });
};

// fetch('notes.json')
//   .then(function (res) {
//     return res.json();
//   })
//   .then(function (data) {

//     for (var key in data) {
//       writeNote(data[key])
//         .then(function () {
//           console.log('Write Note Done');
//         })
//         .catch(console.error);
//     }
//   });

// if ('indexedDB' in window) {

// }

// var getNote = function (id) {
//   return dbPromise.then(function (db) {
//     var tx = db.transaction(TABLE_NAME, 'readwrite');
//     var store = tx.objectStore(TABLE_NAME);
//     return store.get(id);
//   });
// };

// getNote(1).then().then(function (data) {
//   console.log('From indexeddb', data);
// });

// var readAllNote = function () {
//   return dbPromise.then(function (db) {
//     var tx = db.transaction(TABLE_NAME, 'readonly');
//     var store = tx.objectStore(TABLE_NAME);
//     return store.getAll();
//   });
// };

// readAllNote(TABLE_NAME)
//   .then(function (data) {
//     console.log('From indexeddb', data);
//   });


var deleteNote = function (id) {
  return dbPromise.then(function (db) {
    var tx = db.transaction(TABLE_NAME, 'readwrite');
    var store = tx.objectStore(TABLE_NAME);
    store.delete(id);
    return tx.complete;
  });
};

deleteNote(1).then(function (d) {
  console.log('delete is done');
});
