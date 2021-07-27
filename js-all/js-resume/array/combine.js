var test = [
  [1,2,3,4],
  [1,4],
  [1,3],
  [6,7,9],
  [8]
];

function isDuplicate(a, b) {
  const newArr = [].concat(a, b);
  const setArr = Array.from(new Set(newArr));
  return newArr.length !== setArr.length;
}

function combine(arr) {
  let ans = [];
  let map = new Map();
  // function recurse(cur, prev) {

  // }

  for (let i = 0; i < test.length - 1; i++) {
    let cur = arr[i];
    let next = arr[i+1]
    if(isDuplicate(cur,next)) {
      
    }
    ans.push(cur);
    let key = cur.toString();
  }
}