// console.log(sum(1, 2, 3, 4, 5)());
// console.log(sum(1, 2, 3, 4)(5)())
// console.log(sum(1)(2)(3)(4)(5)())
// console.log(sum(1, 2, 3)(4, 5)())
// console.log(sum(1, 2)(3, 4, 5)())
// console.log(sum(1)(2, 3, 4, 5)())

// function sum(...args) {
//   if (!args.length) return 0;
//   const store = [...args];
//   const temp = function (...args2) {
//     store.push(...args2);
//     if (!args2.length) {
//       return store.reduce((acc, curr) => acc + curr, 0);
//     } else {
//       return temp;
//     }
//   };

//   return temp;
// }


function add(a, b, c, d, e) {
  return a + b + c + d + e;
}

function curry(fn) {
  return function helper(...args) {
    if (args.length === fn?.length) {
      return args.reduce((acc, curr) => acc + curr, 0);
    } else {
       return function (...args2) {
        return helper(...args, ...args2);
      };
    }
  };
}

let sum = curry(add);
console.log(sum(1, 2, 3, 4, 5));
console.log(sum(1, 2, 3, 4)(5));
console.log(sum(1)(2)(3)(4)(5));
console.log(sum(1, 2, 3)(4, 5));
console.log(sum(1, 2)(3, 4, 5));
console.log(sum(1)(2, 3, 4, 5));
