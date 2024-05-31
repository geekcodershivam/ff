function polyFill() {
  let timerID = 1;
  let intervalMap = {};

  function setIntervalPolyfill(fn, delay, ...args) {
    const id = timerID++;

    function reTrigger() {
      intervalMap[id] = setTimeout(function () {
        fn.apply(this, args);
        if (intervalMap[id]) {
          reTrigger();
        }
      }, delay);
    }
    reTrigger();
    return id;
  }

  function clearIntervalPolyfill(id) {
    delete intervalMap[id];
  }

  return { setIntervalPolyfill, clearIntervalPolyfill };
}

const { setIntervalPolyfill, clearIntervalPolyfill } = polyFill();
setIntervalPolyfill(() => {
  console.log("setIntervalPolyfill");
}, 1000);
