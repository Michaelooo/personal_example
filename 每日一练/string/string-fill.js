// 在字符串前面填充字符

// 生成字符(性能最快的)
/**
 * 
 * @param {*} str 原子字符
 * @param {*} num 数量
 */
function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;

  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1; // --num;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}


module.exports = function padLeft(str, num, ch) {
  str = str.toString();

  if (typeof num === 'undefined') {
    return str;
  }

  if (ch === 0) {
    ch = '0';
  } else if (ch) {
    ch = ch.toString();
  } else {
    ch = ' ';
  }

  return repeat(ch, num - str.length) + str;
};