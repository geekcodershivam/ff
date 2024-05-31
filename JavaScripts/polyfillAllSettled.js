const promise1 = Promise.resolve("2");
const promise2 = Promise.resolve("2");
const promise3 = new Promise((resolve, reject) => {
  reject("io");
});

// Promise.allSettled([promise1, promise2, promise3])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

function AllSettled(promiseArray) {
  let output = [];
  return new Promise((resolve, reject) => {
    promiseArray.forEach((promise, idx) => {
      promise
        .then((res) => {
          output.push({
            status: "fulfilled",
            value: res,
          });

          if (idx === promiseArray.length - 1) {
            resolve(output);
          }
        })
        .catch((err) => {
          output.push({
            status: "rejected",
            value: err,
          });
          if (idx === promiseArray.length - 1) {
            reject(output);
          }
        });
    });
  });
}

AllSettled([promise1, promise2, promise3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
