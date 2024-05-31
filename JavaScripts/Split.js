console.log(split("The quick the fox jumps the lazy dog.", "the"));
// [ 'The quick ', ' fox jumps ', ' lazy dog.' ]
console.log(split("The quick the fox jumps the lazy dog.", ""));
// [
//     'T', 'h', 'e', ' ', 'q', 'u', 'i',
//     'c', 'k', ' ', 't', 'h', 'e', ' ',
//     'f', 'o', 'x', ' ', 'j', 'u', 'm',
//     'p', 's', ' ', 't', 'h', 'e', ' ',
//     'l', 'a', 'z', 'y', ' ', 'd', 'o',
//     'g', '.'
//   ]
console.log(split("The quick the fox jumps the lazy dog.", " "));
// [
//     'The',   'quick',
//     'the',   'fox',
//     'jumps', 'the',
//     'lazy',  'dog.'
//   ]

function split(string, delimiter) {
  const res = [];
  if (delimiter === "") return Array.from(string);
  const helper = (str, idx) => {
    // base case
    if (idx >= string?.length) return;

    const ind = str?.indexOf(delimiter);
    if (ind >= 0) {
      const item = str.substr(0, ind);
      res.push(item);
      helper(str.substr(ind + delimiter.length), ind + delimiter.length);
    } else {
      res.push(str);
    }
  };

  helper(string, 0);

  return res;
}