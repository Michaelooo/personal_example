// A + B 问题

function getSum(a, b) {
  return b === 0 ? a : getSum(a ^ b, (a & b) << 1);
}

console.log(getSum(1 ,10));