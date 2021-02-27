import {getRandomFloatFromRange} from './utils.js';

const RANGE_LATITUDES = [35.65000, 35.70000];
const RANGE_LONGITUDES = [139.70000, 139.80000];

const getLocation = () => {
  return {
    x: getRandomFloatFromRange(RANGE_LATITUDES[0], RANGE_LATITUDES[1], 5),
    y: getRandomFloatFromRange(RANGE_LONGITUDES[0], RANGE_LONGITUDES[1], 5),
  };
};

export {getLocation};
