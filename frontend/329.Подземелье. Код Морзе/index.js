module.exports = function (fullCode) {
  const morseCode = {
    "-----": 0,
    ".----": 1,
    "..---": 2,
    "...--": 3,
    "....-": 4,
    ".....": 5,
    "-....": 6,
    "--...": 7,
    "---..": 8,
    "----.": 9,
  };

  const decoded = fullCode
    .split("   ")
    .map((item) => {
      const code = item.split(" ").map((code) => {
        if (code[0] === "T") {
          const trueCode = code
            .slice(1, code.length)
            .split("")
            .reverse()
            .join("");
          return morseCode[trueCode];
        } else if (code[0] === "R") {
          const trueCode = code
            .slice(1, code.length)
            .split("")
            .filter((_, i) => i % 2 === 0)
            .join("");
          return morseCode[trueCode];
        } else {
          return morseCode[code];
        }
      });

      return code.join("");
    })
    .join(" ");

  return decoded;
};
