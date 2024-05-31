const promise1 = Promise.reject("2");
const promise2 = Promise.reject("2");
const promise3 = new Promise((resolve, reject) => {
  resolve("io");
});

function Any(promiseArray) {
  let count = 0;
  return new Promise((resolve, reject) => {
    promiseArray.forEach((promise) => {
      promise
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          count++;
          if (count == promiseArray.length) {
            reject(err);
          }
        });
    });
  });
}

Any([promise1, promise2, promise3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
