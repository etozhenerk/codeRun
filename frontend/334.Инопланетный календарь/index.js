/** @returns string */
module.exports = function(inputString) { 
    if (typeof inputString === "string") {
      const list = new Set(["so", "ko", "ta", "qa", "goo"]);
      const regex = /ta'([a-zA-Z0-9']+) ([0-9]+)/g;
      inputString = inputString.toLowerCase();
  
      const currentString = inputString.match(regex);
  
      if (currentString && currentString.length === 1) {
        const [str, num] = currentString[0].split(" ");
        const imp = str.slice(3, str.length);
  
        if (parseInt(num) > 0 && list.has(imp)) {
          return `${imp} ${num}`;
        } else {
          return "0";
        }
      } else {
        return "0";
      }
    }
  }