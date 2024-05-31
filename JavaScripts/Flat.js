const val = { salary: 10000 };

const getSalary = (person) => person.salary
const addBonus = (netSalary) => netSalary + 1000;
const deductTax = (grossSalary) => grossSalary - (grossSalary * .3);

function pipe() {
  let fns = [...arguments];
  return function (value) {
    return fns.reduce((acc, curr)=> curr(acc), value);
  }
}

const result = pipe(
  getSalary,
  addBonus,
  deductTax 
)(val);

console.log(result);


// Input:
// {
//   a : {
//     b : (a,b,c) => a+b+c,
//     c : (a,b,c) => a+b-c,
//   },
//   d : (a,b,c) => a-b-c
// }

// Fn(obj)(1,1,1);

// Output:
// {
//   a : {
//     b : 3,
//     c : 1
//   },
//   d: -1
// }


const obj = {
  a : {
    b : (a,b,c) => a+b+c,
    c : (a,b,c) => a+b-c,
  },
  d : (a,b,c) => a-b-c,
  e: true,
  f: [0, 0],
}

function Fn(obj) {
  return (...args) => {
    for(key in obj) {
      if(typeof obj[key]==='function'){
        obj[key] = obj[key](...args);
      }
      else {
        obj[key] = Fn(obj[key])(...args);
      }
    }
    return obj;
  }
}


console.log(Fn(obj)(1,1,1))

// const f1 = (a, b) => a + b;
// const f2 = (a) => a + 2;
// const f3 = (a) => a + 1;

// const compose = (...fns) =>{
//   return (...args)=>{
//     const val = fns.pop()(...args);
//     return fns.reduceRight((acc, curr) => curr(acc), val);
//   }
// }
// const composedFunc = compose(f3, f2, f1);
// console.log(composedFunc(3, 4)); // 10

