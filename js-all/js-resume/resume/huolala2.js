/*保留小数（四舍五入）data:要保留的数，val:保留的位数*/
function ToFixed(number, digits) {
  let res;
  // 如果是整数需要添加后面的0
  if (digits === 0) return Math.round(number);

  let digit = Math.pow(10, digits);
  let value = Math.round(parseFloat(number) * digit) / digit;
  // 从小数点后面进行分割
  var splitArr = (number+'').split('.');
  // 原始值只存在整数, 需要按照精度补 0
  if (splitArr.length <= 1) {
    res = `${number}.${new Array(digits).fill(0).join('')}`;
  } else {
    if(splitArr[1].length < digits) {
      // 需要补 0
      let wait = digits - splitArr[1].length;
      res = (value+'') + new Array(wait).fill(0);
    } else {
      res = value;
    }
  }
  return res;
}

console.log('result:',ToFixed(2, 4)); //2.0000 
console.log('result:',ToFixed(2.335, 4)); //2.3350
console.log('result:',ToFixed(2.335, 3)); //2.335 
console.log('result:',ToFixed(2.335, 2)); //2.34 
console.log('result:',ToFixed(2.335, 1)); //2.3
console.log('result:',ToFixed(2.335, 0)); //2