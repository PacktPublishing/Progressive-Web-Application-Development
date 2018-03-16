const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
  origin: true
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const serviceAccount = require("./note-pwa-packtpub-firebase-adminsdk-y13zc-a1aa90173b.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://note-pwa-packtpub.firebaseio.com"
});

exports.saveNote = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    admin.database().ref('notes').put({
        id: request.body.id,
        title: request.body.title,
        note: request.body.note,
        date: request.body.date,
        synced: true,
      })
      .then(() => response.status(201).json({
        message: 'Note saved!',
        id: request.body.id
      }))
      .catch((err) => response.status(500).json({
        error: err,
        id: request.body.id,
      }));
  });
});

exports.deleteNote = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    admin.database().ref('notes/' + request.body.id)
      .remove()
      .then(() => response.status(200).json({
        message: 'Note deleted!',
        id: request.body.id
      }))
      .catch((err) => response.status(500).json({
        error: err,
        id: request.body.id,
      }));
  });
});
