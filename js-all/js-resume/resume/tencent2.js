// ● 编写一个变量 const test: Promise, 可以通过 test.then, 延迟1秒后得到一个随机数. test.then(console.log)
let test = new Promise((resolve, reject) => {
  let startTime = Date.now();
  setTimeout(() => {
    const randomNum = Math.floor(Math.random() * 1000);
    resolve(randomNum);
    let total = Date.now() - startTime;
    console.log('total exec time', total);
  }, 1000);
});

test.then((value) => {
  console.log('111',value);
}).then((value) => {
  console.log('222',value);
});
