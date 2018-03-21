// 移除数组中的某个位置上的元素(适用于不需要排序，因为会将最后一个元素的位置移到被删除的位置)
module.exports = remove;

function remove (arr, i) {
  if (i >= arr.length || i < 0) return;
  var last = arr.pop()
  if (i < arr.length) {
    var tmp = arr[i]
    arr[i] = last
    return tmp
  }
  return last
}