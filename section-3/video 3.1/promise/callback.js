// callback
// function add(number, callback) {
//   // Mock async behaviour
//   setTimeout(function () {
//     callback(number + 1);
//   }, 1000);
// }
// // callback
// add(1, function (result1) {
//   console.log(result1);
// });

// // Callback hell
// add(1, function (result1) {
//   add(result1, function (result2) {
//     add(result2, function (result3) {
//       add(result3, function (result4) {
//         add(result4, function (result5) {
//           console.log(result5);
//         });
//       });
//     });
//   });
// });

// callback with Error
function add(number, callback) {
  if (number > 10) {
    callback('You cannot have more than 4');
    return;
  }
  // Mock async behaviour
  setTimeout(function () {
    callback(false, number + 1);
  }, 1000);
}

// callback with error
add(1, function (error, result1) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result1);
});

// call back with error handeling
add(1, function (error, result1) {
  if (error) {
    console.log(error);
    return;
  }
  add(result1, function (error, result2) {
    if (error) {
      console.log(error);
      return;
    }
    add(result2, function (error, result3) {
      if (error) {
        console.log(error);
        return;
      }
      add(result3, function (error, result4) {
        if (error) {
          console.log(error);
          return;
        }
        add(result4, function (error, result5) {
          if (error) {
            console.log(error);
            return;
          }
          console.log(result5);
        });
      });
    });
  });
});
