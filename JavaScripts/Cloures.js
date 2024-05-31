// sampler function

const message = () => {
  console.log("Hello");
};

function samplerFunction(fn, numberofTime) {
  let count = 1;
  return () => {
    if (count++ === numberofTime) {
      fn();
      count=1;
    }
  };
}
const sampler = samplerFunction(message, 4);
sampler();
sampler();
sampler();
sampler();
sampler();
sampler();
sampler();
sampler();

