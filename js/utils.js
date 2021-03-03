const getRandomFloatFromRange = (min, max, decimal = 0) => {
  min = Math.abs(min);
  max = Math.abs(max);
  decimal = Math.abs(decimal);

  return Math.abs((Math.random() * (max - min) + min).toFixed(decimal));
};

const getRandomArrayElement = (array) => {
  return array[getRandomFloatFromRange(0, array.length - 1)];
};

const getArrayRandomLength = (array) => {
  const randomLength = getRandomFloatFromRange(0, array.length - 1);
  const arrayElements = [];

  for(let i = 0; i <= randomLength; i++) {
    arrayElements.push(array[i]);
  }

  return arrayElements;
};

const removeСhildByClass = (parentElement, childClass) => {
  const arrayChildren = Array.from(parentElement.children);
  arrayChildren.forEach((element) => {
    if(element.classList.contains(childClass));
    parentElement.removeChild(element);
  });
};

const setThrottle = (func, ms) => {
  let ignore = false;
  let lastArgs = null;
  let lastThis = null;

  const throttle = function() {
    if(ignore) {
      lastArgs = arguments;
      lastThis = this;
      return;
    }

    func.apply(this, arguments);

    ignore = true;

    setTimeout(() => {
      ignore = false;
      if(lastArgs) {
        throttle.apply(lastThis, lastArgs);
        lastArgs = null;
        lastThis = null;
      }
    }, ms);
  };

  return throttle;
};

export {getRandomFloatFromRange, getRandomArrayElement, getArrayRandomLength, removeСhildByClass, setThrottle};
