function createCountdown(n) {
  return function () {
    if (typeof n !== "number" || n <= 0) {
      return 0;
    } else {
      return n--;
    }
  };
}

module.exports = createCountdown;
