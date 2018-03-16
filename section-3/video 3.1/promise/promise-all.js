// var add = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log('add resolved!');
//     resolve('ADD VALUE');
//   }, 400);
// });

// var minus = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log('minus resolved!');
//     resolve('MINUS VALUE');
//   }, 1000);
// });

// Promise
//   .all([add, minus])
//   .then(function (result) {
//     console.log(result);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

var add = new Promise(function (resolve, reject) {
  setTimeout(function () {
    reject('ADD REJECTS');
  }, 400);
});

var minus = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('MINUS VALUE');
  }, 1000);
});

Promise
  .all([add, minus])
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });
