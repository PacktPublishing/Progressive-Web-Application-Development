// promise
function add(number) {
  return new Promise(function (resolve, reject) {
    if (number > 10) {
      reject('You cannot have more than 4');
    }
    // Mock async behaviour
    setTimeout(function () {
      resolve(number + 1);
    }, 1000);
  });
}
// promise
add(1)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });

// promise chain
add(1)
  .then(add)
  .then(add)
  .then(add)
  .then(add)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });
