module.exports = (str) => {
  if (!str.length) return false;
  let seven,
    counter = 0;

  for (let i = 0; i < str.length; i++) {
    if (
      str[i] !== "7" &&
      str[i] !== "1" &&
      str[i] !== "-" &&
      str[i + 1] !== "7" &&
      str[i] !== "-" &&
      str[i + 1] !== "1"
    )
      return false;

    if (!seven) {
      if (str[i] === "7") {
        if (counter % 4 !== 0) return false;
        seven = `${i}`;
      } else if (str[i] === "-" && str[i + 1] === "7") {
        if (counter % 4 !== 0) return false;
        seven = `${i}`;
        i++;
      } else if (str[i] === "-" && str[i + 1] === "1") {
        i++;
        counter++;
      } else {
        counter++;
      }
    } else {
      if (str[i] === "7") {
        seven = `${i}`;
        const check = counter % 4 === 0 || (counter - 2) % 4 === 0;
        if (!check) return false;
      } else {
        counter++;
      }
    }
  }
  if (!seven) {
    return counter % 4 === 0 ? true : false;
  } else {
    if (counter === 0) return true;

    const check = counter % 4 === 0 || (counter - 2) % 4 === 0;
    return check ? true : false;
  }
};
