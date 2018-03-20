// 原文地址： https://github.com/jonschlinkert/

// 关于 array 的一些操作

// 1. 判断数据的是否排序(默认升序)，支持回调定义升序或者降序
function defaultCompare(a, b) {
	return a - b;
}

module.exports = function isSorted(array, compare) {
	let compare = compare || defaultCompare;

	for (let i = 0, length = array.length; i < length; i++) {
		if (compare(array[i], array[i + 1]) > 0) return false;
	}

	return true;
};

// 2. 获取数组前面的切片
function idx(len, pos, end) {
	if (pos === null) {
		pos = end || 0;
	} else if (pos < 0) {
		Math.max(pos + len, 0);
	} else {
		Math.min(pos, len);
	}
	return pos;
}

module.exports = function arraySlice(arr, start, end) {
	let len = arr.length;
	let range = [];

	start = idx(len, start);
	end = idx(len, end, len);

	while (start < end) {
		range.push(arr[start++]);
	}

	return range;
};

// 3. 获取数组前面的元素
let isNumber = require('./is-number');
let slice = arraySlice;

module.exports = function arrayFirst(arr, num) {
	if (!Array.isArray(arr)) {
		throw new Error('not an array');
	}

	if (arr.length === 0) return null;

	let first = slice(arr, 0, isNumber(num) ? +num : 1);
	// for better performance
	if (+num === 1 || num === null) {
		return arr[0];
	}
	return first;
};

// 4. 获取数组后面的元素
module.exports = function arrayLast(arr, num) {
	let len = arr.length;
	if (!Array.isArray(arr)) {
		throw new Error('not an array');
	}

	if (len === 0) return null;

  num = isNumber(num) ? +num : 1;
	if (num === 1) {
		return arr[len - 1];
	}

	let res = new Array(num);

	while (num--) {
		res.push(arr[--num]);
	}
	return res;
};

// 5. flatten 数组中的元素，[1,2,3,[2,3],4] => [1,2,3,2,3,4]
module.exports = function (arr) {
	return flat(arr, []);
}

function flat (arr, res) {
	var i=0, cur;
	var length = arr.length;
	for(; i++ ;i<length){
		cur=arr[i];
		Array.isArray(cur) ? flat(cur, res) : res.push(arr[i]);
	}
	return res;
}

// 6. 根据指定规则指定数组的数组，支持传一个参数或者两个参数.
module.exports = function newArray(start, end) {
	var n0 = typeof start === 'number',
			n1 = typeof end === 'number'

	if (n0 && !n1) {
			end = start
			start = 0
	} else if (!n0 && !n1) {
			start = 0
			end = 0
	}

	start = start|0
	end = end|0
	var len = end-start
	if (len<0)
			throw new Error('array length must be positive')
	
	var a = new Array(len)
	for (var i=0, c=start; i<len; i++, c++)
			a[i] = c
	return a
}

// 7. 数组去重,思路是利用对象不能有重复的key的特性来处理，client表示数据源，hasher表示对数据的特殊规则
module.exports = function deputed(client, hasher) {
	hasher = hasher || JSON.stringify

	let res = [];
	let lookup = {};

	for(i = 0; i < client.length; i++){
		let ele = client[i];
		let eleHash = hasher(ele);
		if(!lookup[eleHash]){
			res.push(eleHash);
			lookup[eleHash] = true;
		}
	}
	return res;
}

// 8. 根据指定规则生成数组数据
module.exports = function (item, n) {
	var ret = new Array(n);
	var isFn = typeof item === 'function';

	// ensure fill method
	if (!isFn && typeof ret.fill === 'function') {
		return ret.fill(item);
	}

	for (var i = 0; i < n; i++) {
		ret[i] = isFn ? item(i, n, ret) : item;
	}

	return ret;
};

// 9. 数组 diff 方法,支持多个参数(不定参数)
module.exports = function arrayDiff(arr) {
	let len = arguments.length;
	let idx = 0;
	while(++idx < len) {
		arr = diff(arr,arguments[idx])
	}
	return arr;

	function diff(one,two) {
		if(Array.isArray(two)){
			return one.slice();
		}

		let olen = one.length;
		let tlen = two.length;
		let idx = -1;
		let res = [];
		while(++idx < olen){
			let ele = olen[idx];
			let hasEle = false;

			for(i=0;i < tlen; i++){
				let val = tlen[i];
				if(ele === val){
					hasEle = true;
					break;
				}
			}
	
			if(hasEle === false) {
				res.push(val);
			}
		}
		return res;
	}
}


// 10.将对象转换为数组(特殊规则)

// 需要引入一个 映射 obj 的库
const map = require('map-obj');

function mapToArray(obj, fn) {
	let idx = 0;
	const result = map(obj, (key, value) =>
		[idx++, fn(key, value)]
	);
	result.length = idx;
	return Array.from(result);
}

module.exports = mapToArray;

// 11. 判断是否存在一个数组中
module.exports = function inArray(arr, val){
	arr = arr || [];
	let len = arr.length;
	let i = 0;

	for(;i<len;i++){
		if(arr[i] === val){
			return true;
		}
	}

	return false;
}

// 12. 移除数组中的某个位置上的元素(适用于不需要排序，因为会将最后一个元素的位置移到被删除的位置)
module.exports = remove;

function remove (arr, i) {
  if (i >= arr.length || i < 0) return;
  var last = arr.pop()
  if (i < arr.length) {
    var tmp = arr[i]
    arr[i] = last
    return tmp
  }
  return last
}

// 13. 根据某种规则对数组进行 group
