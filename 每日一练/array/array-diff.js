// 数组 diff 方法,支持多个参数(不定参数)
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
