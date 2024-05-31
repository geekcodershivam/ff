const promise1 = Promise.resolve("2");
const promise2 = Promise.resolve("2");
const promise3 = new Promise((resolve, reject) => {
  reject("io");
});

Promise.all([promise1, promise2, promise3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

function All(promiseArray) {
  let output = [];
  return new Promise((resolve, reject) => {
    promiseArray.forEach((promise, idx) => {
      promise
        .then((ele) => {
          output.push(ele);
          if (idx === promiseArray.length - 1) {
            resolve(output);
          }
        })
        .catch((err) => reject(err));
    });
  });
}

All([promise1, promise2, promise3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
