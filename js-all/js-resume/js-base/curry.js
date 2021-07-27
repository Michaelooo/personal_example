// function toCurry(func, ...args) {
//   // ↑需要柯里化的函数作为参数
//   // ↑也可以有初始参数传入
//   // ↑缓存在args中
// ​
//   return function () {
//       // 合并上一次缓存的参数和本次传入的参数
//       args = [...args,...arguments];
//       // 判断参数数量是否足够
//       if (args.length < func.length) {
//           // 如果不够，继续递归
//           // 注意，这里每一次递归都会形成新的闭包
//           // 保证柯里化函数每一步调用都是独立的，互不影响
//           return toCurry(func, ...args);
//       } else
//          // 如果参数满足数量，执行函数并返回结果
//           return func.apply(null, args);
//       }
//   }
// }

function curry(func) {
  return function curried(...args) {
    console.log('----', args);
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        console.log('+++++', args2);
        console.log('+++++', args.concat(args2));
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3));
