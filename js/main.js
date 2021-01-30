'use strict'

let getRandomIntFromRange = (min, max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  if(min === max) {
    return 'Аргументы не могут быть равны или меньше нуля';
  }
  if(max < min) {
    let temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getRandomFloatFromRange = (min, max, decimal) => {
  min = Math.abs(min);
  max = Math.abs(max);
  decimal = Math.abs(decimal);
  if(min === max) {
    return 'Аргументы не могут быть равны или меньше нуля';
  }
  if(max < min) {
    let temp = min;
    min = max;
    max = temp;
  }
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

getRandomIntFromRange(2, 5);
getRandomFloatFromRange(1.2, 1.3, 2);
