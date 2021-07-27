// 使用正则
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/gm,'');
}

