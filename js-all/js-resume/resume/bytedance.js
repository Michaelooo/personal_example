// 实现repeat 顺序打印

function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  })
}

function repeat(func, times) {
  let wait = Math.floor(Math.random() * 1000);
  return function(str) {
    (async function () {
      for (var i = 0; i < times; i++) {
        await sleep(wait);
        func(str);
      }
    })();
    // (async function () {
    //   for (let item of new Array(times)) {
    //     await sleep(wait);
    //     func(str);
    //   }
    // })();
  }
}

const repeactFunc = repeat(console.timeLog, 4, 2000);
repeactFunc('hello world');