/**
 * 用数组的reduce方法实现数组的map
 */
 Array.prototype._map = function(fn, thisArg) {
  const result = [];
  this.reduce((prev, curr, index, array) => {
    result[index] = fn.call(thisArg, array[index], index, array);
  }, 0)
  return result;
}

// 使用reduce将数组的每个元素+索引值
const arr = [1,2,3,4,5]
const arr2 = [6,7,8]

const _mapArr = arr._map(function(v, i){
  return v+i+this.length;
}, arr2)

console.log(_mapArr);
// [4, 6, 8, 10, 12]