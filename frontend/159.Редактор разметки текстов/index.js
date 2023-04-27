const test = (str) => {
  str = str.split(/\r?\n/);
  let ans = "";

  let openedTag = null;

  for (let i = 0; i < str.length; i++) {
    const currentString = str[i];
    if (currentString.startsWith("* ")) {
      if (openedTag !== "ul") {
        ans += "<ul>";
        openedTag = "ul";
      }

      ans += `<li>${currentString.slice(2)}</li>`;
    } else {
      if (openedTag === "ul") {
        ans += "</ul>";
        openedTag = null;
      }

      if (currentString.startsWith("= ")) {
        ans += `<h1>${currentString.slice(2)}</h1>`;
      } else if (currentString.trim().length !== 0) {
        ans += `<p>${currentString.replace(
          /\(\((?<href>.+?) (?<text>.+?)\)\)/giu,
          '<a href="$<href>">$<text></a>'
        )}</p>`;
      }
    }
  }

  if (openedTag === "ul") {
    ans += "</ul>";
  }

  return ans;
};

console.log(test("= head\ntext ((https://ya.ru link)) text.\n* item\n* item"));
