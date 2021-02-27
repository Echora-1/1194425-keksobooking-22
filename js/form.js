import {setStartPosition, recordStartingAddress, setMoveMainMarker} from './map.js';
import {sendData} from './server-connection.js';
import {getSuccess as getSuccessMessage, getError as getErrorMessage} from './status-messages.js';


const MINIMUM_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const ad = document.querySelector('.ad-form');
const addressInput = ad.querySelector('#address');
const pricePerNight = ad.querySelector('#price');
const houseType = ad.querySelector('#type');
const timesIn = ad.querySelector('#timein');
const timesOut = ad.querySelector('#timeout');
const mapFilters = document.querySelector('.map__filters');
const clearButton = ad.querySelector('.ad-form__reset');


const setMinPricePerNight = (houseType) => {
  pricePerNight.setAttribute('placeholder', String(MINIMUM_PRICES[houseType]));
  pricePerNight.setAttribute('min', String(MINIMUM_PRICES[houseType]));
};

houseType.addEventListener('change', () => {
  setMinPricePerNight(houseType.value);
});

const syncSelectByIndex = (firstSelect, secondSelect) => {
  firstSelect.addEventListener('change', () => {
    secondSelect.selectedIndex = firstSelect.selectedIndex;
  });
  secondSelect.addEventListener('change', () => {
    firstSelect.selectedIndex = secondSelect.selectedIndex;
  });
};

const clear = () => {
  ad.reset();
  mapFilters.reset();
  setStartPosition();
  recordStartingAddress(addressInput);
};

clearButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clear();
});

const setSendingData = () => {
  ad.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(getSuccessMessage, getErrorMessage, new FormData(evt.target));
  });
};

recordStartingAddress(addressInput);
setMoveMainMarker(addressInput);
setMinPricePerNight(houseType.value);
syncSelectByIndex(timesIn, timesOut);
setSendingData();

export {clear};
