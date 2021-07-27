// 实现一个红绿灯
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
async function changeColor(color, duration) {
  console.log('traffic-light ', color);
  await sleep(duration);
}
async function main() {
  let count = 0;
  while (true && count < 5) {
    await changeColor('red', 2000);
    await changeColor('yellow', 1000);
    await changeColor('green', 3000);
    count++;
  }
}
main();
