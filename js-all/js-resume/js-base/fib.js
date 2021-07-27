var cache = {};
var count = 0;
function fib(n) {
  count++;
  if (n === 1 || n === 2) {
    return 1;
  }
  if (cache[n]) {
    return cache[n];
  } else {
    var ret = fib(n - 1) + fib(n - 2);
    cache[n] = ret;
    return ret;
  }
}
