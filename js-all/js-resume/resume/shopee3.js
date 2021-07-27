// 实现一个方法转换
import { inspect } from 'util';

var obj = {
  a1: {
    a2: {
      a3: 111,
      a4: 222,
    }
  },
  b1: 222,
  c1: {
    c2: 33
  }
};

// ['a1.a2.a3', 'a1.a2.a4', 'b1', 'c1.c2']

const isObj = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

function transform(obj) {
  const ans = [];

  function recrusive(cur, pre) {
    let str = pre;
    let map = []; //为了去重
    if(Object.prototype.toString.call(cur) === '[object Object]') {
      Object.keys(cur).forEach((key) => {
        console.log('xxx', pre);
        str = pre ? `${pre}.${key}`: key;
        map.push(str);
        recrusive(cur[key], str);
      })
    }
    if(!map.includes(str)) {
      ans.push(str);
    }
  }

  recrusive(obj, '');
  return ans;
}

// const log = any => console.log(inspect(any, true, 5));
console.log(transform(obj));