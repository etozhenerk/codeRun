/**
* @param {number} N - целое число, количество сотрудников готовых к объединению
* @param {number[]} staff - массив длины N с грейдами доступных сотрудников
* @param {number} K - целое число, количество доступных клавиатур
* @returns {number}
*/
module.exports = function (N, staff, K) {
    const countingSort = new Array(25).fill(0);
    let x = 0;
    let count = K;
  
    for (let i = 0; i < staff.length; i++) {
      countingSort[staff[i]]++;
    }
  
    for (let i = countingSort.length - 1; i >= 0; i--) {
      if (count > 0) {
        x += i * Math.min(count, countingSort[i]);
        count -= countingSort[i];
      }
    }
  
    return x; // x - максимальный уровень Яндексформера;
  }