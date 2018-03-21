// 获取数组前面的切片
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