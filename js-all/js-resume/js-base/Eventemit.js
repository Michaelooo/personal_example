class Event {
  constructor() {
    this.eventTypeObj = {};
    this.cacheObj = {};
  }
  on(eventType, fn) {
    // 按照不同的订阅事件类型，存储不同的订阅回调
    if (!this.eventTypeObj[eventType]) {
      this.eventTypeObj[eventType] = [];
    }
    this.eventTypeObj[eventType].push(fn);
    // 如果是先发布，则在订阅者订阅后，则根据发布后缓存的事件类型和参数，执行订阅者的回调
    if (this.cacheObj[eventType]) {
      var cacheList = this.cacheObj[eventType];
      for (var i = 0; i < cacheList.length; i++) {
        cacheList[i]();
      }
    }
  }
  emit() {
    // 可以理解为arguments借用shift方法
    var eventType = Array.prototype.shift.call(arguments);
    var args = arguments;
    var that = this;

    function cache() {
      if (that.eventTypeObj[eventType]) {
        var eventList = that.eventTypeObj[eventType];
        for (var i = 0; i < eventList.length; i++) {
          eventList[i].apply(eventList[i], args);
        }
      }
    }
    if (!this.cacheObj[eventType]) {
      this.cacheObj[eventType] = [];
    }

    // 如果先订阅，则直接订阅后发布
    cache(args);

    // 如果先发布后订阅，则把发布的事件类型与参数保存起来，等到有订阅后执行订阅
    this.cacheObj[eventType].push(cache);
  }
}
