/**
 *
 * @typedef Replace
 *
 * @property {string} from
 * @property {string} to
 */

/**
 *
 * @param {string} message
 * @param {Replace[]} replaces
 * @returns {string}
 */

function decode(message, replaces) {
  let decoded = "";

  for (let i = 0; i < message.length; i++) {
    let replace = null;

    for (let j = 0; j < replaces.length; j++) {
      if (
        message.substring(i, i + replaces[j].from.length) ===
          replaces[j].from &&
        (!replace || replaces[j].from.length >= replace.from.length)
      ) {
        replace = replaces[j];
      }
    }

    if (replace) {
      decoded += replace.to;
      i += replace.from.length - 1;
    } else {
      decoded += message[i];
    }
  }

  return decoded;
}

module.exports = { decode };

console.log(
  decode("ab", [
    { from: "b", to: "bar" },
    { from: "ab", to: "foo" },
  ])
);
