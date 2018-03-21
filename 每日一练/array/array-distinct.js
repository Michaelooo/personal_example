// 数组去重,思路是利用对象不能有重复的key的特性来处理，client表示数据源，hasher表示对数据的特殊规则
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