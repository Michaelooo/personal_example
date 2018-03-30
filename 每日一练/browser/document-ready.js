const assert = require('assert');
module.exports = function ready(cb){
  assert.notEqual(typeof document, 'undefined', '仅适用于浏览器');
  let state = document.readyState;
  if(state === 'complete' || state === 'interactive'){
    setTimeout(cb, 0);
  }
  document.addEventListener('DOMContentLoaded',function onload(){
    cb();
  })
}