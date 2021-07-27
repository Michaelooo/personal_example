// 数组摊平

const test1 = [[1,2], [3, [4,5]], 6,[7,8,9]];

function faltten(arr) {
  const ans = [];
  function recursive(cur, temp) {
    if(Array.isArray(cur)) {
      cur.forEach(item => {
        recursive(item, ans)
      })
    } else {
      ans.push(cur);
    }
  }

  recursive(arr, []);

  return ans;
}

console.log(faltten(test1));