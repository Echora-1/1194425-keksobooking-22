import {getRandomFloatFromRange} from './utils.js';

const rangeLatitudes = [35.65000, 35.70000];
const rangeLongitudes = [139.70000, 139.80000];

const getLocation = () => {
  return {
    x: getRandomFloatFromRange(rangeLatitudes[0], rangeLatitudes[1], 5),
    y: getRandomFloatFromRange(rangeLongitudes[0], rangeLongitudes[1], 5),
  };
};

export {getLocation};
