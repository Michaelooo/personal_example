// 判断数据的是否排序(默认升序)，支持回调定义升序或者降序
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