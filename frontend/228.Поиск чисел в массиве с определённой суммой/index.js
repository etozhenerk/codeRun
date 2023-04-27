/** @returns Boolean */
module.exports = function (nums, k) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (nums[i] + nums[j] === k && j !== i) return true;
    }
  }
  return false;
};
