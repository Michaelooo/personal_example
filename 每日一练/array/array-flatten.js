// flatten 数组中的元素，[1,2,3,[2,3],4] => [1,2,3,2,3,4]
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