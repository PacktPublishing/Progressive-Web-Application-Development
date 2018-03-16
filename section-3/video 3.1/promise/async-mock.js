function add(number) {
  setTimeout(function () {
    return number + 1;
  }, 1000);
}

console.log(add(1));
