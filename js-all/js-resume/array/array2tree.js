let arr = [
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 1, name: '部门A', parentId: 2 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 },
];

/**
 * 数组转树 递归求解
 */
function toTree(list, parId) {
  let len = list.length;

  let res = [];
  function loop(parId) {
    for (let i = 0; i < len; i++) {
      let item = list[i];
      if (item.parentId === parId) {
        item.children = loop(item.id);
        res.push(item);
      }
    }
    return res;
  }

  return loop(parId);
}


console.log('递归求解', toTree(arr, 0));