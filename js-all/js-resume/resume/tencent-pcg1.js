
var arr = [1,222,4,5,66,5,7];

function test(arr) {
  let map = [];

  // 去重 或者 Array.from(new Set(array))
  for (var i = 0; i < arr.length; i++) {
    if(map.includes(arr[i])) {
      continue;
    }
    map.push(arr[i]);
  }

  // 排序 math.sort(a,b => a -b)
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; i++) {
      if(arr[i] > arr[j]) {
        let temp = arr[i];
        arr[j] = temp;
        arr[i] = arr[j]
      }
    }
  }

  return arr;

}