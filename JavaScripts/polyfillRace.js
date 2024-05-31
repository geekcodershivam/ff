const promise1 = Promise.reject("2");
const promise2 = Promise.reject("2");
const promise3 = new Promise((resolve, reject) => {
  reject("io");
});

Promise.race([promise1, promise2, promise3])
  .then((ele) => console.log("Original", ele))
  .catch((err) => console.log("Original", err));

function Race(promiseArray) {
  return new Promise((resolve, reject) => {
    promiseArray.forEach((promise) => {
      promise.then(resolve).catch(reject);
    });
  });
}

Race([promise1, promise2, promise3])
  .then((ele) => console.log("Expected", ele))
  .catch((err) => console.log("Expected", err));
