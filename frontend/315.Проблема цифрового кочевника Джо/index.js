module.exports = async function (input) {
  return new Promise((resolveStart) => {
    const result = [];

    function wrapper() {
      return new Promise((resolve) => {
        function getIt(input) {
          let mainSize = 0;

          function sizeCheck() {
            return new Promise((resolve) => {
              input.size((size) => (mainSize = size));
              setTimeout(() => resolve(mainSize), 20);
            });
          }

          sizeCheck()
            .then((result) => {
              return (mainSize = result);
            })
            .then((mainSize) => {
              for (let i = 0; i < mainSize; i++) {
                let currentFile = null;

                function checkFile() {
                  return new Promise((resolve) => {
                    input.read(i, (file) => (currentFile = file));
                    setTimeout(() => resolve(currentFile), 20);
                  });
                }
                checkFile().then((res) => {
                  if (typeof res === "string") {
                    const repeat = isRepeat(res);
                    if (repeat) {
                      result.push(repeat);
                    }
                  } else if (!isEmptyOrNull(res)) {
                    return getIt(res);
                  }
                });
              }
            });
        }
        getIt(input);
        setTimeout(() => resolve(), 200);
      });
    }

    function isEmptyOrNull(obj) {
      if (obj === null) return true;

      if (Object.keys(obj).length > 0) {
        return false;
      }
      return true;
    }

    function isRepeat(str) {
      if (str.split("").length !== new Set(str.split("")).size) return str;
    }

    wrapper().then(() => resolveStart(result.sort()));
  });
};
