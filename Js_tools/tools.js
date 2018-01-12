// 获取时间戳
var timestamp = (new Date()).valueOf()
var timestamp = +new Date()

// 数组取最大值
var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max(...arr))

// 数组求和
var arr = [1, 2, 3, 4, 5];
function sum(arr) {
	return arr.reduce((a, b) => a + b);
}
sum(arr); //15

// 将 argruments 对象(类数组)转换成数组
var arr = Array.prototype.slice.call(arguments);

var arr = Array.from(arguments);

var args = [...arguments];

// 数字取整， 支持IE
Math.trunc =
	Math.trunc ||
	function(x) {
		if (isNaN(x)) {
			return NaN;
		}
		if (x > 0) {
			return Math.floor(x);
		}
		return Math.ceil(x);
	};

~~2.33;

// 数字格式化 123456 =》 123,456
str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

123456789..toLocaleString('zh-hans-CN-u-nu-hanidec',{useGrouping:false})  // "一二三四五六七八九"
123456789..toLocaleString('zh-hans-CN-u-nu-hanidec') // "一二三,四五六,七八九"
