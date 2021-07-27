// 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度
import { inspect } from 'util';

// 原始 list 如下
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 },
];

// hashmap 
function convert(list) {
  const res = [];
  const map = list.reduce((acc, v) => ((acc[v.id] = v), acc), {});
  for (const item of list) {
    if (item.parentId === 0) {
      res.push(item);
      continue;
    }
    if (item.parentId in map) {
      const parent = map[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
}

function convert(list) {
  const res = [];
  const map = list.reduce((item, v) => (( res[v.id] = v),res), {});

  for (const item of list) {
    if (item.parentId === 0) {
      res.push(item);
      continue;
    }

    if(map[item.parentId]) {
      const parent = map[item.parentId];
      (parent.children || []).push(item);
    }
  }

  return res;
}

// 递归 recursive
const arrayToTree = (arr) => {
  if (!Array.isArray(arr) || arr.length < 1) return null;
  const [root] = arr.filter(item => item.parentId === 0);
  const addChildren = (node, dataList) => {
    const children = dataList
      .filter(item => item.parentId === node.id)
      .map(item => addChildren(item, dataList));
    return { ...node, children };
  };
  return addChildren(root, arr);
};

const treeToArray = (node) => {
  const nodeToArray = (node, arr) => {
    const { children, ...item } = node;
    arr.push(item);
    children.forEach(child => nodeToArray(child, arr));
    return arr;
  };
  return nodeToArray(node, []);
};

// console.log("%o", convert(list));
console.log(inspect(convert(list), true, 5));
