// 递归的去将当前节点和父节点存入数组
function recurrenceFindNodeList(
  caps: callbackType[],
  bubs: callbackType[],
  node: nodeType,
  handleName: string
) {
  const parent: any = node.parentNode;
  if (eventMap.has(parent)) {
    const parentObj = eventMap.get(parent)[handleName];
    caps = [...parentObj.capture, ...caps];
    bubs = [...bubs, ...parentObj.bubble];
    recurrenceFindNodeList(caps, bubs, parent, handleName);
  }
  return [...caps, ...bubs];
}

// 对于10ms 的实现

requestAnimationFrame(handler);
function handler(time: number) {
    let taskFinishTime: number = window.performance.now();
    while (taskFinishTime - time < 10) {
      const nextTask = tasklist.shift();
      if (nextTask?.cb) {
        nextTask.cb();
      }
      taskFinishTime = window.performance.now();
    }
    if (tasklist.length > 0) {
      requestAnimationFrame(handler);
    }
  }
