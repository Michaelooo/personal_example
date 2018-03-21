// 判断是否存在一个数组中
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