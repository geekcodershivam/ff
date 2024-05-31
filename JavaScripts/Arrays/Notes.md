// This

1. [This refer to an object]
   [??]

MYTH: 
1. ref: khud ko  ?? [XX] 
2. ref: jo call krata hai??  [valid][]
3. scope or arrow function  [valid] [0.01%]

// Rules:
Find This -> Function Invocation Type [99.9%][this] 

// Req
Invocation: calling [sum()]
Context: [function body]
Scope: [variable scope defined]


// Types:
1. Function Invocation: [sum(), abc()][window][??]
2. Method Invocation: [obj.sayHi()][obj][??]
// question (Function Invocation, Method Invocation )
3. Constructor Invocation: [new Obj(), class][Obj, instance][??]
4. Indirect Invocation: [call, apply][[context][this]][??]
5. Bounded Invocation: [Bind][[context][this]][??]
6. Aonymous Invocation: [arrow function, without name function, IIFE, cb][parent ka this] [() => {}][??]

// Function Declaration vs Function Expression 


1. Body kha pe hai. or define kha pe hai.
2. Kya h uska re - use kar skate hai ?? [recusive call].

// simple: [trace function Declaration]
// simple: [named function Declaration]

// This Type: [window or undefined][Brower]
  -> [Brower]: [window]
  -> [NodeJs]: [GlobalObject]
  -> [ReactNative]: [NativeObject]

 Note* interviewer -> [ask][wrt env brower, nodejs....][Brower]
 Note* todo strict mode vs non - strict mode 
 //


 // Arrow vs Normal function
1. arguments access : Normal function
   arrow function didn't have arguments

2. new keyword use with normal function 
   arrow function do not use new keyword

3. Normal function create Constructor function
   Arrow function create Constructor function

[Flatten 1][array]  (!)
[Flatten 2][array n level] (depth)
[Flatten 3][object]  
[Flatten 4][placeholder][Object.key({obj})] 
[Flatten 5][with Name] []
[Flatten 6][object with 1 level]
[Flatten 7][_.get([] || "")]
[Flatten 8][_.set({}, [], value)]
[_.deepCopy]
[_.groupBy()] //
[_.deepEqual()]
[caches()] // 
[PipeLine] 
1. [1.caL().Add().value(), 1. caL().Add().value, 3: caL().Add()]
2. [add, sub, multi]  

[curry] 7:[sum(1, 3)(1)(), sum()()(), valueCopy, _PlaceHolder]



var object = {
  'a': [{
    'b': {
      'c': 3
    }
  }]
};


function preCall(path) {
  //in-built O(n)
  const p1 = path.replaceAll('[', '.');
  const p2 = p1.replaceAll(']', '');
  const p3 = p2.split(".");
  return p3;
}


function helper(object, newPath, value) {
  const [curr, ...rest] = newPath;
  if (rest.length) {
    if (!object[curr]) {
      let isNum = `${+rest[0]}` === rest[0];
      object[curr] = isNum ? [] : {};
    }
    if (typeof object[curr] === 'object') {
      let isNum = `${+rest[0]}` === rest[0];
      object[curr] = helper(isNum ? [] : {}, rest, value)
    } else {
      object[curr] = helper(object[curr], rest, value)
    }
  } else {
    object[curr] = value;
  }
  return object;
}

// _.
let _ = {
  get: function(object, path, optional) {
    let newPath = Array.isArray(path) ? path : preCall(path);

    /* let obj = object;
    newPath.forEach((ele) => {
      obj = obj?.[ele] || optional;
    })
    return obj; */

    // using reduce
    /*  return newPath.reduce((acc, curr) => (acc?.[curr]) || optional, object) */
  },
  set: function(object, path, value) {
    let newPath = Array.isArray(path) ? path : preCall(path);
    helper(object, newPath, value);
  },
  groupBy: function(input, items) {
    let result = {};
    // array  + object
    for (let key in input) {
      let isFunc = typeof items === 'function';
      let keys = isFunc ? items(input[key]) : (input[key])[items]; // 

      if (result.hasOwnProperty(keys)) {
        result[keys].push(input[key]);

      } else {
        result[keys] = [input[key]]
      }

    }
    return result;

  }
}


/* console.log(_.get(object, "a[0].b.c"))
console.log(_.get(object, ['a', '0', 'b', 'c']))
console.log(_.get(object, ['a', 'b', 'b', 'c']))
console.log(_.get(object, 'a.b.c', 'default')) */

/* var object1 = {
  'a': [{
    'b': {
      'c': 3
    }
  }]
};
_.set(object1, 'a[0].b.c', 4)
console.log(object1);
// => 4

_.set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z);
// => 5
 */

console.log(_.groupBy([6.1, 4.2, 6.3], Math.floor));
// => { '4': [4.2], '6': [6.1, 6.3] }

// The `_.property` iteratee shorthand.
console.log(_.groupBy(['one', 'two', 'three'], 'length'));
// => { '3': ['one', 'two'], '5': ['three'] }

console.log(_.groupBy({
  'one': 'one',
  'two': 'wow',
  'three': "wwww"
}, 'length'));


let seen = new Set(self, obj2)

function isEqual(obj1, obj2) {
   if(typeof obj1 !== typeof obj2){
        return false;
    }

    if (seen.has(obj1) || seen.has(obj2)) return true;  // Circular reference detected
 
    seen.add(obj1);
    seen.add(obj2);

    for (let key in obj1) {
      let val1 = obj1[key];
      let val2 = obj2[key];
      let isObj = val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object';

      if (isObj) {
        if (!isEqual(val1, val2)) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      } else if (typeof val1 !== typeof val2) {
        return false;
      }
    }

    for (let key in obj2) {
      if (!obj1.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }
 https://jsfiddle.net/gyvfhs72/1/

 Hi all,
Today is my last day at Tokopedia and I would like to take a moment to reflect upon and thank everyone who has been a part of this journey.
Over the last 2.7 years I have thoroughly enjoyed working with the Web Platform, CM/IM, Core Teams here at Tokopedia and I am very thankful for the opportunities, professional guidance and support provided to me during the tenure. Any journey is incomplete without amazing peers. Therefore, I would like to thank all the amazing leads: @Deeksha Agarwal  @Komal Singh @Adi Umbas Primadharma @Glenn Hizkia  highly supportive backend team: @Ajay Yadav @Madhav Sharma @Saurabh Gupta @Amit Kumar Singh Chauhan @Rian Krishandi @Aman Verma @Davyn Vallerian @D'Wina Andrea @Laksono Bramantio @Prajnasatrya Sukur Suryanto @Radhian Amri @Yash Goel @Vinod Kumar Beniwal , awesome EP team: @Love Kumar @Aayush Khanna @Mayank AggarwalAji Dwiyono.

Above all I would like to thank the highly patient and extremely supportive product team led by  @Yogi Sentosa @Putri Nafisah @Daffa Alif Pratama @Kinanti Pratami 
Special thanks to the following people for everyday fun and delightful conversations:glenn.hizkia@tokopedia.com@Ham Richard Adhika Hartono @Rian Krishandi - will miss all the fun in meetings & over slack the most  
@Kinanti Pratami  - one last time kamsahamnida friend  

@Karan Singh Negi @Syed Sumair UL Islam @Shivam Mani Tripathi - for all the day to day conversations
@Ishan Ghorela @Devendra Patidar @Syed Sumair UL Islam - for helping me out everyday
@Syed Haani Hasan Rizvi - thank you for all the guidance and being an inspiring leader.

Lets stay connected: LinkedIn
