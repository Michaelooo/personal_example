function createSleepPromise(timeout){
  return new Promise(resolve => {
    setTimeout(resolve,timeout);
  });
}

function sleep (timeout) {
  
  function promiseFunction(value){
    return createSleepPromise(timeout).then(() => value);
  }

  const sleepPromise = createSleepPromise(timeout);
  promiseFunction.then = ( ...args )=> {sleepPromise.then(...args)};
  promiseFunction.catch = Promise.resolve().catch;

  return promiseFunction;
}

module.exports = sleep;