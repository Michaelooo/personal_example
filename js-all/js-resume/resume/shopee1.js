// 查看一些输出的结果

const a = 1;

function func1() {
  // const a = 2;
  return function () {
    console.log(a);
  }
}


function func2() {
  const a = 3;
  const func = func1();
  return func;
}


const run = func2();
run();