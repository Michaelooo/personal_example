function PromiseAll1(promiseArrs) {
  return new Promise((resolve, reject) => {
    //返回一个新的Promise
    let arr = []; //定义一个空数组存放结果
    let i = 0;
    for (let idx = 0; idx < promiseArrs.length; idx++) {
      //循环遍历数组
      promiseArrs[idx].then((data) => {
        // 将结果和索引传入handleData函数;
        arr[idx] = data;
        i++;
        if (idx === promiseArrs.length) {
          //当i等于传递的数组的长度时
          resolve(arr); //执行resolve,并将结果放入
        }
      }, reject);
    }
  });
}

// 第二种实现
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function (i) {
        Promise.resolve(promises[i]).then(
          function (value) {
            resolvedCounter++;
            resolvedValues[i] = value;
            if (resolvedCounter === promiseNum) {
              return resolve(resolvedValues);
            }
          },
          function (reason) {
            return reject(reason);
          },
        );
      })(i);
    }
  });
}

var p1 = Promise.resolve(1),
  p2 = 2,
  p3 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 100, 'hahahha');
  });
promiseAll([p1, p2, p3])
  .then(function (results) {
    //then方法不会被执行
    console.log(results);
  })
  .catch(function (e) {
    //catch方法将会被执行，输出结果为：2
    console.log(2);
  });
