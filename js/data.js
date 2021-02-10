import {getRandomFloatFromRange, getRandomArrayElement, getArrayRandomLength} from './utils.js';
import {getLocation} from './location.js';

const userAvatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
const title = 'For rent';
const typesOfHouses = ['palace', 'flat', 'house', 'bungalow'];
const availableTimes = ['12:00', '13:00', '14:00'];
const houseFeatures = [ 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const urlPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const minPrice = 10000;
const maxPrice = 100000;
const minRooms = 1;
const maxRooms = 12;
const descriptionOffer = 'Spacious and comfortable';

const createAd = () => {
  const location = getLocation();
  const rooms = getRandomFloatFromRange(minRooms, maxRooms);
  const type = getRandomArrayElement(typesOfHouses);

  return {
    author: { avatar: 'img/avatars/user'+ getRandomArrayElement(userAvatarNumbers)  +'.png' },
    offer: {
      title: title,
      address: String(location.x + ', ' + location.y),
      price: getRandomFloatFromRange(minPrice, maxPrice),
      type: type,
      rooms: rooms,
      guests: rooms * 2,
      checkin: getRandomArrayElement(availableTimes),
      checkout: getRandomArrayElement(availableTimes),
      features: getArrayRandomLength(houseFeatures),
      description: descriptionOffer + ' ' + type,
      photos: getArrayRandomLength(urlPhotos),
    },
    location: {
      x: location.x,
      y: location.y,
    },
  };
};

const getSimilarAds = (count) => new Array(count).fill(null).map(() => createAd());

export {getSimilarAds};
