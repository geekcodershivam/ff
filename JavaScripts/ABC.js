let obj = {
  age: 10,
};

function myAge(name) {
  console.log(name, this.age);
}

console.log(myAge.call(obj, "name"));

Function.prototype.callMy = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw Error("context is function");
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw Error("context is function");
  }
  if (!Array.isArray(args)) {
    throw Error("args is not valid");
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw Error("context is function");
  }
  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

console.log(myAge.callMy(obj, "name"));

function PromiseActions(exe) {
  let onResolve;
  let onReject;
  let isFull;
  let isRej;
  let isCalled;
  let value;

  function res(val) {
    isFull = true;
    value = val;
    if (typeof onResolve === "function") {
      onResolve(value);
      isCalled = true;
    }
  }
  function rej(val) {
    isRej = true;
    value = val;
    if (typeof onReject === "function") {
      onReject(value);
      isCalled = true;
    }
  }
  this.then = function (cb) {
    onResolve = cb;
    if (isFull && !isCalled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };
  this.catch = function (cb) {
    onReject = cb;
    if (isRej && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };

  exe(res, rej);
}
