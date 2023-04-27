const parseCode = (code) => {
  const regex =
    /^([G-HK-U][3-8]{3})(B|T)([C|K|M|B|G|J|P|O|R|S|8|M|E]{2})([A-Y0-9]{1,24})Z$/;
  const match = code.match(regex);
  if (match) {
    const spaceCode = match[1];
    const industryCode = match[2];
    const subcode = match[3];
    const number = match[4];
    return [spaceCode, industryCode, subcode, number];
  } else {
    return null;
  }
};

module.exports = function (code) {
  const parsedCode = parseCode(code);
  if (parsedCode) {
    const [spaceCode, industryCode, subcode, number] = parsedCode;
    switch (industryCode) {
      case "B":
        if (
          !(
            subcode[0] === "C" ||
            subcode[0] === "K" ||
            subcode[0] === "M" ||
            subcode[0] === "B"
          )
        ) {
          return null;
        }

        if (
          subcode[1] &&
          !(subcode[1] === "G" || subcode[1] === "J" || subcode[1] === "P")
        ) {
          return null;
        }

        break;
      case "T":
        if (!(subcode[0] === "O" || subcode[0] === "R" || subcode[0] === "S")) {
          return null;
        }

        if (
          subcode[1] &&
          !(
            subcode[1] === "J" ||
            subcode[1] === "8" ||
            subcode[1] === "M" ||
            subcode[1] === "E"
          )
        ) {
          return null;
        }

        break;
      default:
        return null;
    }
    return parsedCode;
  } else {
    return null;
  }
};
