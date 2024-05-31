// function flat(arr, n) {
//   const result = [];

//   for (let key in arr) {
//     console.log(n > 0);
//     if (Array.isArray(arr[key]) && n > 0) {
//       result.push(...flat(arr[key], n - 1));
//     } else {
//       result.push(arr[key]);
//     }
//   }
//   return result;
// }

// console.log(flat([111, 11, 11, [11, 11], [[[1]]]], 1));

// function flatObject(obj) {
//   const result = {};
//   function generate(objj, str) {
//     for (let key in objj) {
//       let pk = str + key;
//       let value = objj[key];
//       if (typeof value === "object") {
//         generate(value, pk + ".");
//       } else {
//         result[pk] = value;
//       }
//     }
//   }
//   generate(obj, "");
//   return result;
// }

// const objItem = {
//   a: 1,
//   b: [12, 10],
//   c: {
//     p: 10,
//     q: 12,
//   },
// };

// console.log(flatObject(objItem, ""));

const helper = (obj, path, value) => {
  const [current, ...rest] = path;

  if (rest.length > 0) {
    if (!obj[current]) {
      const isNumeric = `${+rest[0]}` === rest[0];
      obj[current] = isNumeric ? [] : {};
    }

    if (typeof obj[current] === "object") {
      const isNumeric = `${+rest[0]}` === rest[0];
      obj[current] = helper(isNumeric ? [] : {}, rest, value);
    } else {
      obj[current] = helper(obj[current], rest, value);
    }
  } else {
    obj[current] = value;
  }

  return obj;
};

const set = (obj, path, value) => {
  let pathArr = path;

  if (typeof pathArr === "string") {
    pathArr = pathArr.replaceAll("[", ".").replaceAll("]", "").split(".");
  }

  helper(obj, pathArr, value);

};

const object = {};
set(object, "a[0].b.c", 4);
console.log(object.a[0].b.c);
// 4

set(object, ["x", "0", "y", "z"], 5);
console.log(object.x[0].y.z);
// 5

console.log(object);