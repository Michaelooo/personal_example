import events from 'events';
import fs from 'fs';
const eventEmitter = new events.EventEmitter();
const eventListener = function () {
  console.log('event triggered');
};
eventEmitter.on('emitted', eventListener);
eventEmitter.emit('emitted');

setImmediate(() => {
  console.log('first');
});
process.nextTick(() => {
  console.log('second');
});
console.log('third');

const readableStream = fs.createReadStream("./js-base/curry.js");
let content = "";
readableStream.on("data", (chunk) => {  console.log('===', chunk); content += chunk;});
readableStream.on("end", () => {  console.log(content);});

