import {STARTING_LATITUDE, STARTING_LONGITUDE} from './map.js';

const MINIMUM_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');
const pricePerNight = adForm.querySelector('#price');
const houseType = adForm.querySelector('#type');
const timesIn = adForm.querySelector('#timein');
const timesOut = adForm.querySelector('#timeout');

addressInput.value = `${STARTING_LATITUDE.toFixed(5)}, ${STARTING_LONGITUDE.toFixed(5)} `;

const setMinPricePerNight = (houseType) => {
  pricePerNight.setAttribute('placeholder', String(MINIMUM_PRICES[houseType]));
  pricePerNight.setAttribute('min', String(MINIMUM_PRICES[houseType]));
};

setMinPricePerNight(houseType.value);

houseType.addEventListener('change', () => {
  setMinPricePerNight(houseType.value)
});

const syncSelectByIndex = (firstSelect, secondSelect) => {
  firstSelect.addEventListener('change', () => {
    secondSelect.selectedIndex = firstSelect.selectedIndex;
  });
  secondSelect.addEventListener('change', () => {
    firstSelect.selectedIndex = secondSelect.selectedIndex;
  });
};

syncSelectByIndex(timesIn, timesOut);

export {};
