// 日期时间相关

// 1. 解析 ms数 为具体的时间
function parseMs(ms) {
	if (typeof ms !== 'number') {
		throw new TypeError('Expected a number');
	}

	var roundTowardZero = ms > 0 ? Math.floor : Math.ceil;

	return {
		days: roundTowardZero(ms / 86400000),
		hours: roundTowardZero(ms / 3600000) % 24,
		minutes: roundTowardZero(ms / 60000) % 60,
		seconds: roundTowardZero(ms / 1000) % 60,
		milliseconds: roundTowardZero(ms) % 1000
	};
};

// 2. 将 ms 转化为易读的表示，是 1 的 plus version

// 求复数，会引入一个变复数过程中会不规则变化的词库
var irregularPlurals = require('irregular-plurals');

function plur(str, plural, count) {
	if (typeof plural === 'number') {
		count = plural;
	}

	if (str in irregularPlurals) {
		plural = irregularPlurals[str];
	} else if (typeof plural !== 'string') {
		plural = (str.replace(/(?:s|x|z|ch|sh)$/i, '$&e').replace(/([^aeiou])y$/i, '$1ie') + 's')
			.replace(/i?e?s$/i, function (m) {
				var isTailLowerCase = str.slice(-1) === str.slice(-1).toLowerCase();
				return isTailLowerCase ? m.toLowerCase() : m.toUpperCase();
			});
	}

	return count === 1 ? str : plural;
};

const parseMs = parseMs;
const plur = plur;

module.exports = (ms, opts) => {
	if (!Number.isFinite(ms)) {
		throw new TypeError('Expected a finite number');
	}

	opts = opts || {};

	if (ms < 1000) {
		const msDecimalDigits = typeof opts.msDecimalDigits === 'number' ? opts.msDecimalDigits : 0;
		return (msDecimalDigits ? ms.toFixed(msDecimalDigits) : Math.ceil(ms)) + (opts.verbose ? ' ' + plur('millisecond', Math.ceil(ms)) : 'ms');
	}

	const ret = [];

	const add = (val, long, short, valStr) => {
		if (val === 0) {
			return;
		}

		const postfix = opts.verbose ? ' ' + plur(long, val) : short;

		ret.push((valStr || val) + postfix);
	};

	const parsed = parseMs(ms);

	add(Math.trunc(parsed.days / 365), 'year', 'y');
	add(parsed.days % 365, 'day', 'd');
	add(parsed.hours, 'hour', 'h');
	add(parsed.minutes, 'minute', 'm');

	if (opts.compact) {
		add(parsed.seconds, 'second', 's');
		return '~' + ret[0];
	}

	const sec = ms / 1000 % 60;
	const secDecimalDigits = typeof opts.secDecimalDigits === 'number' ? opts.secDecimalDigits : 1;
	const secFixed = sec.toFixed(secDecimalDigits);
	const secStr = opts.keepDecimalsOnWholeSeconds ? secFixed : secFixed.replace(/\.0+$/, '');
	add(sec, 'second', 's', secStr);

	return ret.join(' ');
};
