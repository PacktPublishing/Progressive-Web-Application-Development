var fab = document.querySelector('#fab');
var deferredPrompt;

fab.addEventListener('click', function () {

  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function (choice) {
      console.log(choice.outcome);
      if (choice.outcome === 'dismissed') {
        console.log('installation was cancelled By User');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }
});

window.addEventListener('beforeinstallprompt', function (event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function () {
        console.log('Service worker registered!');
      })
      .catch(function (e) {
        console.error('SW Errors while registering!', e);
      });
  });
}
