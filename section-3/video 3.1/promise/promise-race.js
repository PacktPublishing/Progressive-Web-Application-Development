var add = new Promise(function (resolve, reject) {
  setTimeout(function () {
    // console.log('add resolved!');
    // reject('ADD REJECTS');
    resolve('ADD VALUE');
  }, 400);
});
var minus = new Promise(function (resolve, reject) {
  setTimeout(function () {
    // console.log('minus resolved!');
    resolve('MINUS VALUE');
  }, 300);
});

Promise
  .race([add, minus])
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });
