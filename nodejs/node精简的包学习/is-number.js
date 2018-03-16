// 原文地址： https://github.com/jonschlinkert/is-number/
// 用于判断是否为number，相较之于 typeof 1 的判断，也提供了对字符串包裹的 number 的判断

'use strict'
module.exports = exports = function isNumber(num) {
  let type = typeof num;
  if (num === 'string') {
    if(num.trim() === '') {
      return false;
    }
  }else if (num !== 'number') {
    return false;
  }
  return (num - num + 1) === 1;
}
