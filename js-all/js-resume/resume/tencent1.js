// 对一个数组进行均分, 均分为大小为m的多段, 测试数组 let arr =  [1, 2, 3, 4, 5, 1, 1], m=2. 结果存储到一个新数组, 一次输出: [[1, 2], [3, 4], [5, 1], [1]].
let arr1 =  [1, 2, 3, 4, 5, 1, 1];
let arr2 =  [1, 2, 3, 4, 5, 1, 1,3];

function splitArr(nums, m) {
  let start = 0;
  let end = m + start;
  let len = nums.length;
  let res = [];

  for (let i = start; i < nums.length; i+=m) {
    let item = nums.slice(start, end);
    res.push(item);
    len = len - m;
    start = end;
    end = len < m ? start + len : start + m;
  }

  return res;
}


console.log(splitArr(arr1, 2));
console.log(splitArr(arr2, 2));
console.log(splitArr(arr2, 3));