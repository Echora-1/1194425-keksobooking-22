import {STARTING_LATITUDE, STARTING_LONGITUDE} from './map.js';

const BUNGALO_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;
const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');
const pricePerNight = adForm.querySelector('#price');
const typeHouse = adForm.querySelector('#type');
const timesIn = adForm.querySelector('#timein');
const timesOut = adForm.querySelector('#timeout');

addressInput.value = `${STARTING_LATITUDE.toFixed(5)}, ${STARTING_LONGITUDE.toFixed(5)} `;

const setMinPricePerNight = (typeHouse) => {
  switch(typeHouse) {
    case 'bungalow':
      return pricePerNight.setAttribute('placeholder', String(BUNGALO_MIN_PRICE)),
      pricePerNight.setAttribute('min', String(BUNGALO_MIN_PRICE));
    case 'flat':
      return pricePerNight.setAttribute('placeholder', String(FLAT_MIN_PRICE)),
      pricePerNight.setAttribute('min', String(FLAT_MIN_PRICE));
    case 'house':
      return pricePerNight.setAttribute('placeholder', String(HOUSE_MIN_PRICE)),
      pricePerNight.setAttribute('min', String(HOUSE_MIN_PRICE));
    case 'palace':
      return pricePerNight.setAttribute('placeholder', String(PALACE_MIN_PRICE)),
      pricePerNight.setAttribute('min', String(PALACE_MIN_PRICE));
  }
};

setMinPricePerNight(typeHouse.value);

typeHouse.addEventListener('change', () => {
  setMinPricePerNight(typeHouse.value)
});

const syncSelectByValue = (firstSelect, secondSelect) => {
  firstSelect.addEventListener('change', () => {
    secondSelect.selectedIndex = Array.from(secondSelect.children).findIndex(option => option.value === firstSelect.value);
  });
  secondSelect.addEventListener('change', () => {
    firstSelect.selectedIndex = Array.from(firstSelect.children).findIndex(option => option.value === secondSelect.value);
  });
};

syncSelectByValue(timesIn, timesOut);

export {};
