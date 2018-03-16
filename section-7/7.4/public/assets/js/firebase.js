var BACKGROUND_SYNC_SAVE = 'new-notes-sync';
var FIREBASE_NOTES_URL = 'https://note-pwa-packtpub.firebaseio.com/notes.json';
var FIREBASE_FN_SAVE_NOTE_URL = 'https://us-central1-note-pwa-packtpub.cloudfunctions.net/saveNote';
var FIREBASE_FN_DELETE_NOTE_URL = 'https://us-central1-note-pwa-packtpub.cloudfunctions.net/deleteNote';

// function sendData(noteData) {
//   fetch(FIREBASE_NOTES_URL + '.json', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(noteData)
//     })
//     .then(function (res) {
//       console.log('Sent data', res);
//     });
// }

function sendData(noteData) {
  return fetch(FIREBASE_FN_SAVE_NOTE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(noteData)
  });
}

function updateData(noteData) {
  return fetch(FIREBASE_FN_SAVE_NOTE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(noteData)
  });
}

function getFirebaseData() {
  return fetch(FIREBASE_NOTES_URL);
}

function deleteFirebaseData(id) {
  return fetch(FIREBASE_FN_DELETE_NOTE_URL, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      id: id,
    })
  });
}
