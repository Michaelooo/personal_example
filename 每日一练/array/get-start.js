
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