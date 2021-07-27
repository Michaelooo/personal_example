// 实现一个深拷贝
function deepCopy(data) {
  let result;
  if(Array.isArray(data)) {
    result = [...data];
  }

  if(Object.prototype.toString.call(data) === '[object Object]') {
    for(let key in data) {
      if(data.hasOwnProperty(key)) {
        result[key] = deepCopy(data[key]);
      } else {
        result[key] = data[key];
      }
    }
  }

  return result;
}