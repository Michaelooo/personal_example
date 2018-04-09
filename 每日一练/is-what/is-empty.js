'use strict'
var isArray = Array.isArray;

function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || isArray(obj))
    return false
  return !Object.keys(obj).length
}

module.exports = isEmptyObject;