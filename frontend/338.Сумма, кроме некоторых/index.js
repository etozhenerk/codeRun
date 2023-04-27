function sumExcept(a, i, n) {
  // ваш код

  if (!checkNumber(i)) {
    i = 0;
  }

  if (!checkNumber(n)) {
    n = 0;
  }

  if (i >= a.length) {
    const ans = a.reduce((prev, curr) => {
      if (!checkNumber(curr)) {
        curr = 0;
      }

      return prev + curr;
    }, 0);

    return ans;
  }

  if (i + n >= a.length) {
    let ans = 0;
    for (let index = 0; index < i; index++) {
      let curr = a[index];

      if (!checkNumber(curr)) {
        curr = 0;
      }
      ans += curr;
    }

    return ans;
  }

  const ans = a.reduce((prev, curr, index) => {
    if (!checkNumber(curr)) {
      curr = 0;
    }
    if (index < i || index >= n + i) {
      return prev + curr;
    } else {
      return prev;
    }
  }, 0);
  return ans;
}

function checkNumber(n) {
  if (n > 0 && Number.isInteger(n)) {
    return true;
  } else {
    return false;
  }
}

module.exports = sumExcept;

console.log(sumExcept([1, 9, 8, 4], 0, 4));
