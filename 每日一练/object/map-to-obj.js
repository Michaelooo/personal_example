// map obj to a new object
'use strict';

// customized for this use-case
const isObject = x =>
	typeof x === 'object' &&
	x !== null &&
	!(x instanceof RegExp) &&
	!(x instanceof Error) &&
	!(x instanceof Date);

	/**
	 * 
	 * @param {*} obj 原始对象
	 * @param {*} fn map 规则
	 * @param {*} opts 可选参数{deep:递归, target:目标对象}
	 * @param {*} seen 
	 */
module.exports = function mapObj(obj, fn, opts, seen) {
	opts = Object.assign({
		deep: false,
		target: {}
	}, opts);

	seen = seen || new WeakMap();  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

	if (seen.has(obj)) {
		return seen.get(obj);
	}

	seen.set(obj, opts.target);

	const target = opts.target;
	delete opts.target;

	for (const key of Object.keys(obj)) {
		const val = obj[key];
		const res = fn(key, val, obj);
		let newVal = res[1];

		if (opts.deep && isObject(newVal)) {
			if (Array.isArray(newVal)) {
				newVal = newVal.map(x => isObject(x) ? mapObj(x, fn, opts, seen) : x); // 🤔思考什么情况下会出现为数组的情况
			} else {
				newVal = mapObj(newVal, fn, opts, seen);
			}
		}

		target[res[0]] = newVal;
	}

	return target;
};