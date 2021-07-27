setTimeout(() => {
  console.log(1);
}, 1000);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

console.log(3);
new Promise((resolve, reject) => {
  console.log('promise3');
  resolve();
  console.log('promise4');
})
  .then(
    () => {
      console.log('promise5');
      setTimeout(() => {
        console.log(5);
      }, 500);
    },
    () => {
      console.log('promise6');
    },
  )
  .then(() => {
    console.log('promise7');
  })
  .then(() => {
    console.log('promise8');
  });

console.log(4);

// 写出结果
/**
 * 
 * 3
promise3
promise4
4
promise5
promise7
promise8
2
promise1
5
1
 */
