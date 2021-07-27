// 说明：你可以假设输入一定是一个只有三位数的整数，这个整数大于等于100，小于1000。

// 输入: number = 123
// 输出: 321


// 输入: number = 900
// 输出: 9

function reverseInteger(num) {
  let a = num % 10;
  let b = Math.floor((num / 10) % 10);
  let c = Math.floor((num / 100) % 10);

  return a * 100 + b * 10 + c;
}


console.log(reverseInteger(123)); // 321
console.log(reverseInteger(900)); //9