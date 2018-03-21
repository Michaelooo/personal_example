// 驼峰写法转化   aaAaa  ->  aa-aaa ，就是利用正则来处理。

// 需要引入一个 有关于正则 的库，https://github.com/slevithan/xregexp
const xRegExp = require('xregexp');

/**
 * 
 * @param {*} text 源字符串
 * @param {*} separator 分割字符
 */
module.exports = (text, separator) => {
	if (typeof text !== 'string') {
		throw new TypeError('Expected a string');
	}

	separator = typeof separator === 'undefined' ? '_' : separator;

	const regex1 = xRegExp('([\\p{Ll}\\d])(\\p{Lu})', 'g');
	const regex2 = xRegExp('(\\p{Lu}+)(\\p{Lu}[\\p{Ll}\\d]+)', 'g');

	return text
		// TODO: Use this instead of `xregexp` when targeting Node.js 10:
		// .replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, `$1${separator}$2`)
		// .replace(/(\p{Lowercase_Letter}+)(\p{Uppercase_Letter}[\p{Lowercase_Letter}\d]+)/gu, `$1${separator}$2`)
		.replace(regex1, `$1${separator}$2`)
		.replace(regex2, `$1${separator}$2`)
		.toLowerCase();
};