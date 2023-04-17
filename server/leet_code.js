// 2629.Function Composition ##################
var compose = function (functions) {
  return (num) => {
    functions = [...functions].reverse();
    functions.map((func) => {
      num = func(num);
    });
    return num;
  };
};

const fn = compose([(x) => x + 1, (x) => 2 * x]);
console.log(fn(4)); // 9

// 2619.Array Prototype Last ##################
Array.prototype.last = function () {
  return this.length > 0 ? this.pop() : "-1";
};

// const arr = [1, 0, 3];
// console.log(arr.last()); // 3

// 2621.Sleep ##################
async function sleep(millis) {
  await new Promise((resolve) => setTimeout(resolve, millis));
}

// let t = Date.now();
// console.log(Date.now());
// sleep(100).then(() => console.log(Date.now() - t)); // 100

// 2620.Counter ##################
var createCounter = function (n) {
  return function () {
    return n++;
  };
};
// const counter = createCounter(10);
// console.log(counter());
// console.log(counter());
// console.log(counter());
