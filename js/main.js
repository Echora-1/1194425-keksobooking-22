'use strict'
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
const rangeLatitudes = [35.65000, 35.70000];
const rangeLongitudes = [139.70000, 139.80000];
const minPrice = 10000;
const maxPrice = 100000;
const minRooms = 1;
const maxRooms = 12;
const descriptionOffer = 'Spacious and comfortable';
const similarCount = 10;

const getRandomFloatFromRange = (min, max, decimal = 0) => {
  min = Math.abs(min);
  max = Math.abs(max);
  decimal = Math.abs(decimal);

  return Math.abs((Math.random() * (max - min) + min).toFixed(decimal));
};

const getRandomArrayElement = (array) => {
  return array[getRandomFloatFromRange(0, array.length - 1)];
};

const getLocation = () => {
  return {
    x: getRandomFloatFromRange(rangeLatitudes[0], rangeLatitudes[1], 5),
    y: getRandomFloatFromRange(rangeLongitudes[0], rangeLongitudes[1], 5),
  };
};

const getArrayRandomLength = (array) => {
  const randomLength = getRandomFloatFromRange(0, array.length - 1);
  const arrayElements = [];

  for(let i = 0; i <= randomLength; i++) {
    arrayElements.push(array[i]);
  }

  return arrayElements;
};

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
getSimilarAds(similarCount);
