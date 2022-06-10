const generateRandomRedOrBlue = () => {
  const result = Math.random();
  return result < 0.5 ? "blue" : "red";
};

const cookieToObj = (str) => {
  str += ";";
  let leftPointer = 0,
    rightPointer = 0,
    begin = 0;
  const obj = {};
  while (rightPointer < str.length) {
    while (str[leftPointer] !== "=") {
      leftPointer++;
    }
    rightPointer = leftPointer;
    while (str[rightPointer] !== ";") {
      rightPointer++;
    }
    obj[str.slice(begin, leftPointer)] = str.slice(
      leftPointer + 1,
      rightPointer
    );

    begin = rightPointer + 2;
    rightPointer = begin;
    leftPointer = begin;
  }
  return obj;
};

module.exports = { generateRandomRedOrBlue, cookieToObj };
