/*
Short ES6 lesson
// normal function expression
var name = function () {

};

// Arrow function
var name = () => {}

// Define variable
var one = 1;
let two = 2;
const three = 3;
*/

/*
if (navigator.serviceWorker) {
*/
if ('serviceWorker' in navigator) {
  // Register the SW
  navigator.serviceWorker.register('/sw.js')
    .then(function (registration) {
      // console.log('[WEB] SW Registered', registration);
      console.log('[WEB] SW Registered');
    })
    .catch(function (event) {
      console.error('[WEB] SW Registration Failed', event);
    });
}
