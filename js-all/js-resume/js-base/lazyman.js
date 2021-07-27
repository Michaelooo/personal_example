// LazyMan("Hank").eat("dinner").sleepFirst(5).sleep(2).eat("supper");

function _LazyMan(name) {
  this.name = name;
  this.queue = [];
  this.queue.push(() => {
    console.log('Hi! This is ' + name + '!');
    this.next();
  });

  setTimeout(() => {
    this.next();
  }, 0);
}

_LazyMan.prototype.eat = function (name) {
  this.queue.push(() => {
    console.log('Eat ' + name + '~');
    this.next();
  });
  return this;
};

_LazyMan.prototype.next = function () {
  var fn = this.queue.shift();
  fn && fn();
};

_LazyMan.prototype.sleep = function (time) {
  this.queue.push(() => {
    setTimeout(() => {
      console.log('Wake up after ' + time + 's!');
      this.next();
    }, time * 1000);
  });
  return this;
};

_LazyMan.prototype.sleepFirst = function (time) {
  this.queue.unshift(() => {
    setTimeout(() => {
      console.log('Wake up after ' + time + 's!');
      this.next();
    }, time * 1000);
  });
  return this;
};

function LazyMan(name) {
  return new _LazyMan(name);
}

LazyMan('Hank').eat('dinner').sleepFirst(5).sleep(2).eat('supper');
