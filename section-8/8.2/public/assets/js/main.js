var app = (function () {
  var indexPage = function () {
    // Check if we still have connection online
    var networkDataReceived = false;
    // Register Dialog box
    var dialog = document.querySelector('dialog');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.querySelector('.close').addEventListener('click', function () {
      window.history.back(1);
      dialog.close();
    });

    // Placehodlers
    var TITLE_PLACEHOLDER = '{{TITLE}}';
    var NOTE_PLACEHOLDER = '{{NOTE}}';
    var ID_PLACEHOLDER = '{{ID}}';
    var SYNCED_PLACEHOLDER = '{{SYNCED}}';
    var DATE_PLACEHOLDER = '{{DATE}}';
    var CLOUD_ICON =
      '<div id="tt3" class="icon material-icons">cloud_upload</div>';
    var EMPTY_NOTE_PLACEHODER = '<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet" id="column"> <div class="mdl-card mdl-shadow--2dp" style="width:95%; margin:1rem; text-align:center; padding:1rem"> <h3>You dont have any notes!</h3> </div> </div>';
    // TO See how this template looks like, please open index.html and see comment under <div id="grid"></div>
    var NOTE_TEMPLATE =
      '<!-- Column START --> <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet"> <!-- CARD START --> <div id="{{ID}}" class="mdl-card mdl-shadow--2dp" style="width:95%; margin:1rem"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">{{TITLE}}  {{SYNCED}}</h2> </div> <div class="mdl-card__media mdl-color--cyan" style="padding:2px"> </div> <div class="mdl-card__supporting-text"> {{NOTE}} </div> <div class="mdl-card__actions mdl-card--border"> <a href="/add.html?id={{ID}}" class="mdl-button mdl-js-button mdl-button--colored mdl-color-text--cyan mdl-js-ripple-effect"> Edit </a> <a href="#id={{ID}}" class="delete-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"> Delete </a> <div class="mdl-layout-spacer"></div><div class="mdl-layout-spacer"></div> <p class="mdl-textfield--align-right">{{DATE}}</p> </div> </div> <!-- CARD END --> </div> <!-- Column END -->';

    var getRegex = function (str) {
      return new RegExp(str, 'g');
    };

    var replacePlaceholders = function (data) {
      var title = data.title;
      var note = data.note;
      var id = data.id;
      var date = data.date;
      var synced = !data.synced ? '' : CLOUD_ICON;

      var HTML = NOTE_TEMPLATE.replace(getRegex(TITLE_PLACEHOLDER), title);
      HTML = HTML.replace(getRegex(ID_PLACEHOLDER), id);
      HTML = HTML.replace(getRegex(NOTE_PLACEHOLDER), note);
      HTML = HTML.replace(getRegex(DATE_PLACEHOLDER), helpers.formatDate(date));
      HTML = HTML.replace(getRegex(SYNCED_PLACEHOLDER), synced);
      HTML = HTML.replace(getRegex(NOTE_PLACEHOLDER), note);

      return HTML;
    };

    var getListOfDeleteButtons = function () {
      // get all delete-button classes
      return document.querySelectorAll('.delete-button');
    };

    var removeClickListerner = function () {
      var buttonsElements = getListOfDeleteButtons();
      for (var i = 0; i < buttonsElements.length; i++) {
        buttonsElements[i].removeEventListener('click', showModalFn, false);
      }
    };

    var attachClickTodeleteButtons = function () {
      var buttonsElements = getListOfDeleteButtons();
      // Attach click event to all delete-button
      for (var i = 0; i < buttonsElements.length; i++) {
        buttonsElements[i].addEventListener('click', showModalFn);
      }
    };

    // Show notes
    var updateUI = function (data) {
      removeClickListerner();
      var grid = document.querySelector('#grid');
      grid.innerHTML = '';
      if (!data.length) {
        grid.insertAdjacentHTML('beforeend', EMPTY_NOTE_PLACEHODER);
        return;
      }
      for (var i = 0; i < data.length; i++) {
        var snippet = replacePlaceholders({
          title: data[i].title,
          note: data[i].note,
          id: data[i].id,
          date: data[i].date,
          synced: data[i].synced,
        });
        grid.insertAdjacentHTML('beforeend', snippet);
      }
      attachClickTodeleteButtons();
    };

    var showModalFn = function () {
      dialog.showModal();
    };

    var sortedByDate = function (data) {
      var getTime = function (d) {
        return new Date(d).getTime();
      };
      return data.sort(function (a, b) {
        return getTime(b.date) - getTime(a.date);
      });
    };

    var sortAndUpdate = function (data) {
      var sorted = sortedByDate(data);
      updateUI(sorted);
    };

    var getDataAndUpdateUI = function () {
      var dataArray = [];

      // Get frech data from backend database
      getFirebaseData()
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          for (var key in data) {
            data[key].id = key;
            dataArray.push(data[key]);
          }
          sortAndUpdate(dataArray);
        })
        .catch(function (err) {
          console.error('onFetchInitialLoad: ', err);
          // Call essential methods
          db.readAllNote().then(function (data) {
            // sort always with latest ID
            sortAndUpdate(data);
          });
        });
    };

    var deleteNote = function (id) {
      deleteFirebaseData(id)
        .then(function () {
          db.deleteNote(id)
            .then(function () {
              getDataAndUpdateUI();
              helpers.showMessage('Note deleted: ' + id);
              window.history.back(1);
            });
        })
        .catch(function () {
          helpers.showMessage('Sorry cannot be deleted now, try later!');

          // Register a background sync and delete items later!

          window.history.back(1);
        });
    };

    // Call initially to update data
    getDataAndUpdateUI();

    dialog
      .querySelector('.confirmDelete')
      .addEventListener('click', function () {
        var id = helpers.getHashByName('id');
        deleteNote(id);
        dialog.close();
      });
  };

  var addPage = function () {
    var id = helpers.getParameterByName('id'); // "1"
    var pageTitle = document.querySelector('#page-title');
    var addNoteForm = document.forms.addNote; // Or document.forms['addNote']
    var titleInput = addNoteForm.elements.title;
    var noteInput = addNoteForm.elements.note;

    var AttachSubmitForm = function (data) {
      // Listen to form submit
      addNoteForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var title = titleInput.value.trim();
        var note = noteInput.value.trim();

        if (title === '' || note === '') {
          helpers.showMessage('Please enter valid data!');
          return;
        }

        var noteData = {
          id: data ? data.id : new Date().getTime(),
          title: title,
          note: note,
          date: new Date(),
          synced: false,
        };

        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          navigator.serviceWorker.ready
            .then(function (sw) {
              db.writeNote(noteData)
                .then(function () {
                  helpers.showMessage('successfully saved to local db!');
                  setTimeout(function () {
                    window.location.href = '/index.html';
                  }, 1500);
                  return sw.sync.register(BACKGROUND_SYNC_SAVE);
                });
            });
        } else {
          // if background sync is not supported;
          sendData(noteData)
            .then(function () {
              helpers.showMessage('successfully saved to firebase!');
              setTimeout(function () {
                window.location.href = '/index.html';
              }, 1500);
            });
        }
      });
    };

    // This means we are in edit mode
    if (id) {
      pageTitle.innerHTML = 'Edit your Note';
      // get Note information from DB
      db.getNote(id).then(function (data) {
        titleInput.value = data.title;
        noteInput.value = data.note;
        AttachSubmitForm(data);
      });
    } else {
      // call essential methods
      AttachSubmitForm();
    }
  };

  return {
    indexPage: indexPage,
    addPage: addPage,
  };
})();

/** Register your Service worker here,
 ** and the best practice is to register only when page has fully been downlaoded already!
 **/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js', {
        scope: '/'
      })
      .then(function (reg) {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
      })
      .catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
      });
  });
}

// if ('serviceWorker' in navigator && 'SyncManager' in window) {
//   navigator.serviceWorker.ready
//     .then(function (sw) {
//       return sw.sync.register('tag-name');
//     })
//     .then(function () {
//       console.log('tag-name has been registered');
//     })
//     .catch(function (e) {
//       console.log('error while registering tag');
//     });
// }


// Push Notification
var notificationButton = document.querySelector('.notification-button');

function modifyNotificationButton() {
  notificationButton.innerText = 'Subscribed';
  notificationButton.disabled = true;
}

function showSuccessMessage() {
  modifyNotificationButton();
  //Visual Options,
  var options = {
    body: 'You have successfully subscribed to our Notification service!',
    icon: '/assets/images/icons/icon-96x96.png',
    image: '/assets/images/image-sample.jpg',
    badge: '/assets/images/icons/icon-96x96.png',
    dir: 'ltr', // 'auto' | 'ltr' | 'rtl'
    vibrate: [100, 50, 200],
  };

  new Notification('Subscription granted!', options);
}

function requestPermission() {
  Notification.requestPermission(function (userChoice) {
    // granted , denied
    console.log('result:', userChoice);
    if (userChoice === 'denied') {
      console.log('Notification permission denied!');
    } else {
      console.log('Notification permission granted!');
      showSuccessMessage();
    }
  });
}

if ('Notification' in window && 'serviceWorker' in navigator) {
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    console.log('Notification permission has already granted!');
    modifyNotificationButton();
  } else {
    notificationButton.addEventListener('click', requestPermission);
  }
} else {
  // if broweser doesn't support , we can easily ignore this button
  notificationButton.style.display = 'none';
}
