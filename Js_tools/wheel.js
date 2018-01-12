// apply 的模拟实现
Function.prototype.apply = function(context, arr) {
	var context = Object(context) || window;
	context.fn = this;

	var result;
	if (!arr) {
		result = context.fn();
	} else {
		var args = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			args.push("arr[" + i + "]");
		}
		result = eval("context.fn(" + args + ")");
	}

	delete context.fn;
	return result;
};

// call 的模拟实现

Function.prototype.call2 = function(context) {
	var context = context || window;
	context.fn = this;

	var args = [];
	for (var i = 1, len = arguments.length; i < len; i++) {
		args.push("arguments[" + i + "]");
	}

	var result = eval("context.fn(" + args + ")");

	delete context.fn;
	return result;
};

// 测试一下
var value = 2;

var obj = {
	value: 1
};

function bar(name, age) {
	console.log(this.value);
	return {
		value: this.value,
		name: name,
		age: age
	};
}

bar.call(null); // 2

console.log(bar.call2(obj, "kevin", 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }

// bind 的模拟实现
Function.prototype.bind2 = function(context) {
	if (typeof this !== "function") {
		throw new Error(
			"Function.prototype.bind - what is trying to be bound is not callable"
		);
	}

	var self = this;
	var args = Array.prototype.slice.call(arguments, 1);

	var fNOP = function() {};

	var fBound = function() {
		var bindArgs = Array.prototype.slice.call(arguments);
		return self.apply(
			this instanceof fNOP ? this : context,
			args.concat(bindArgs)
		);
	};

	fNOP.prototype = this.prototype;
	fBound.prototype = new fNOP();
	return fBound;
};

// new 的模拟实现
function objectFactory() {
	var obj = new Object(),
		Constructor = [].shift.call(arguments);

	obj.__proto__ = Constructor.prototype;

	var ret = Constructor.apply(obj, arguments);

	return typeof ret === "object" ? ret : obj;
}
