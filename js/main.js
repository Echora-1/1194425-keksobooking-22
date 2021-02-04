'use strict'
const userAvatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
const title = 'For rent';
const typesOfHouses = ['palace', 'flat', 'house', 'bungalow'];
const availableTime = ['12:00', '13:00', '14:00'];
const houseFeatures = [ 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const urlPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const latitude = [35.65000, 35.70000];
const longitude = [139.70000, 139.80000];
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
    x: getRandomFloatFromRange(latitude[0], latitude[1], 5),
    y: getRandomFloatFromRange(longitude[0], longitude[1], 5),
  };
};

const getNonRepeatingArray = (array) => {
  let randomLength = getRandomFloatFromRange(0, array.length - 1);
  let nonRepeatArray = [];

  for(let i = 0; i <= randomLength; i++) {
    nonRepeatArray.push(array[i]);
  }

  return nonRepeatArray;
};

const createAd = () => {
  let location = getLocation();
  let rooms = getRandomFloatFromRange(minRooms, maxRooms);
  let type = getRandomArrayElement(typesOfHouses);

  return {
    author: { avatar: 'img/avatars/user'+ getRandomArrayElement(userAvatarNumbers)  +'.png' },
    offer: {
      title: title,
      address: location.x + ', ' + location.y,
      price: getRandomFloatFromRange(minPrice, maxPrice),
      type: type,
      rooms: rooms,
      guests: rooms * 2,
      checkin: getRandomArrayElement(availableTime),
      checkout: getRandomArrayElement(availableTime),
      features: getNonRepeatingArray(houseFeatures),
      description: descriptionOffer + ' ' + type,
      photos: getNonRepeatingArray(urlPhotos),
    },
    location: {
      x: location.x,
      y: location.y,
    },
  };
};

const similarAd = new Array(similarCount).fill(null).map(() => createAd());

