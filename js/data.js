import {getRandomFloatFromRange, getRandomArrayElement, getArrayRandomLength} from './utils.js';
import {getLocation} from './coordinates.js';

const USER_AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
const TITLE = 'Уютное жильё в удобном районе';
const TYPES_OF_HOUSES = ['palace', 'flat', 'house', 'bungalow'];
const AVAILABLE_TIMES = ['12:00', '13:00', '14:00'];
const HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const URL_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const MIN_PRICE = 10000;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 12;
const DESCRIPTION_OFFER = 'подходит как туристам, так и бизнесменам. С новым ремонтом и мебелью.';

const getSimulationAd = () => {
  const location = getLocation();
  const rooms = getRandomFloatFromRange(MIN_ROOMS, MAX_ROOMS);
  const type = getRandomArrayElement(TYPES_OF_HOUSES);

  return {
    author: {avatar: `img/avatars/user${getRandomArrayElement(USER_AVATAR_NUMBERS)}.png`},
    offer: {
      title: TITLE,
      address: `${String(location.x)},  ${String(location.y)}`,
      price: getRandomFloatFromRange(MIN_PRICE, MAX_PRICE),
      type: type,
      rooms: rooms,
      guests: rooms * 2,
      checkin: getRandomArrayElement(AVAILABLE_TIMES),
      checkout: getRandomArrayElement(AVAILABLE_TIMES),
      features: getArrayRandomLength(HOUSE_FEATURES),
      description: DESCRIPTION_OFFER,
      photos: getArrayRandomLength(URL_PHOTOS),
    },
    location: {
      x: location.x,
      y: location.y,
    },
  };
};

const getSimilarAds = (count) => new Array(count).fill(null).map(() => getSimulationAd());

export {getSimilarAds};
