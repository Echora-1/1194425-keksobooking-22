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

export {getRandomFloatFromRange, getRandomArrayElement, getArrayRandomLength};

