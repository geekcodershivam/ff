function polyFill() {
  let timeOutId = 0;
  let timeOutTimeoutMap = {};
  function setTimeoutPolyfill(fn, delay, ...args) {
    const timeId = timeOutId++;
    timeOutTimeoutMap[timeId] = true;
    const startTime = Date.now();

    function tigger() {
      if (!timeOutTimeoutMap[timeId]) return;
      if (Date.now() > startTime + delay) {
        fn();  // Type
      } else {
        requestIdleCallback(tigger);
      }
    }

    requestIdleCallback(tigger);
    return timeId;
  }

  function clearTimeoutPolyfill(id) {
    delete timeOutTimeoutMap[id];
  }

  return {
    setTimeoutPolyfill,
    clearTimeoutPolyfill,
  };
}

var { setTimeoutPolyfill, clearTimeoutPolyfill } = polyFill();

console.log("start");
var myId = setTimeoutPolyfill(function () {
  console.log("Welcome to jscafe");
}, 1000);
clearTimeoutPolyfill(myId);

console.log("end");
