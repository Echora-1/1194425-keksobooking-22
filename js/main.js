'use strict'

const getRandomFloatFromRange = (min, max, decimal = 0) => {
  min = Math.abs(min);
  max = Math.abs(max);
  decimal = Math.abs(decimal);
  return Math.abs((Math.random() * (max - min) + min).toFixed(decimal));
}

getRandomFloatFromRange(1.2, 1.3, 2);
