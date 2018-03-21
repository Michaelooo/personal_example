
// 获取数组后面的元素
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
