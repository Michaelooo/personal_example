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
