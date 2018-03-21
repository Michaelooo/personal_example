// 根据指定规则生成数组数据
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