'use strict';

const get = require('get-value');
const has = require('has-values');

module.exports = function(obj, path, options) {
  if (isObject(obj) && (typeof path === 'string' || Array.isArray(path))) {
    return has(get(obj, path, options));
  }
  return false;
};

function isObject(val) {
  return val != null && (typeof val === 'object' || typeof val === 'function' || Array.isArray(val));
}