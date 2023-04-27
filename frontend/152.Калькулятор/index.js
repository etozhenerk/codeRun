const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const [n] = lines;
  calc(parseInt(n));
});

/**
 *
 * @param {number} n во входном файле написано натуральное число N, не превосходящее 106.
 * @returns {void} В первой строке выходного файла выведите минимальное количество операций. Во второй строке выведите числа, последовательно получающиеся при выполнении операций. Первое из них должно быть равно 1, а последнее N. Если решений несколько, выведите любое.
 */

const calc = (n) => {
  const dp = new Array(n + 1).fill(0);
  const operations = [];

  for (let i = 2; i < n + 1; i++) {
    let item = dp[i - 1];

    if (i % 2 === 0) {
      item = Math.min(item, dp[i / 2]);
    }
    if (i % 3 === 0) {
      item = Math.min(item, dp[i / 3]);
    }
    dp[i] = item + 1;
  }

  while (n > 1) {
    operations.push(n);

    if (dp[n - 1] === dp[n] - 1) {
      n = n - 1;
    } else if (n % 2 === 0 && dp[n / 2] === dp[n] - 1) {
      n = n / 2;
    } else {
      n = n / 3;
    }
  }

  operations.push(1);
  operations.reverse();

  rl.output.write(dp[dp.length - 1].toString() + "\n");
  rl.output.write(operations.join(" "));
};
