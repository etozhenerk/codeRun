/**
 * @param {number[]} nums1 - первый отсортированный массив
 * @param {number} m - количество значимых элементов в nums1
 * @param {number[]} nums2 - второй отсортированный массив
 * @param {number} n - количество элементов в nums2
 * @return {void} Не возвращайте ничего, вместо этого модифицируйте nums1.
 */
module.exports = function merge(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    for (let k = nums1.length - 1; k >= 0; k--) {
      if (i >= 0 && nums1[i] > nums2[j]) {
        nums1[k] = nums1[i];
        i--;
      } else if (j >= 0) {
        nums1[k] = nums2[j];
        j--;
      }
    }
  }
  