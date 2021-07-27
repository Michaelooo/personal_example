// const util = require('util');
// const EventEmitter = require('events');

// function MyStream() {
//   EventEmitter.call(this);
// }

// util.inherits(MyStream, EventEmitter);

// MyStream.prototype.write = function(data) {
//   this.emit('data', data);
// };

// const stream = new MyStream();

// console.log(stream instanceof EventEmitter); // true
// console.log(MyStream.super_ === EventEmitter); // true

// stream.on('data', (data) => {
//   console.log(`接收的数据："${data}"`);
// });
// stream.write('运作良好！'); 

const EventEmitter = require('events');

class MyStream extends EventEmitter {
  write(data) {
    this.emit('data', data);
  }
}

const stream = new MyStream();

stream.on('data', (data) => {
  console.log(`接收的数据："${data}"`);
});
stream.write('使用 ES6');