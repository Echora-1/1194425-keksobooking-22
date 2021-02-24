import {STARTING_LATITUDE, STARTING_LONGITUDE, mainMarker} from './map.js';
import {sendData} from './server-connection.js';
import {assignActiveStatus as assignPageActiveStatus, assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';

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
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButtom = errorMessage.querySelector('.error__button');
const main = document.querySelector('main');
const mapFilters = document.querySelector('.map__filters');
const clearButton = ad.querySelector('.ad-form__reset');

const setStartingAddress = () => {
  addressInput.value = `${STARTING_LATITUDE.toFixed(5)}, ${STARTING_LONGITUDE.toFixed(5)} `;
};

const setMinPricePerNight = (houseType) => {
  pricePerNight.setAttribute('placeholder', String(MINIMUM_PRICES[houseType]));
  pricePerNight.setAttribute('min', String(MINIMUM_PRICES[houseType]));
};

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

const clear = () => {
  ad.reset();
  mapFilters.reset();
  mainMarker.setLatLng({lat: STARTING_LATITUDE, lng: STARTING_LONGITUDE});
  setTimeout(() => {
    setStartingAddress();
  }, 0);
};

clearButton.addEventListener('click', clear);

const closeSuccessMessage = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc'|| evt.type === 'mousedown') {
    evt.preventDefault();
    successMessage.remove();
    assignPageActiveStatus();
    document.removeEventListener('keydown', closeSuccessMessage);
    document.removeEventListener('mousedown', closeSuccessMessage);
  }
}

const getSuccessMessage = () => {
  successMessage.style.zIndex = 1000;
  main.append(successMessage);
  clear();
  assignPageInactiveStatus();
  document.addEventListener('keydown', closeSuccessMessage);
  document.addEventListener('mousedown', closeSuccessMessage);
}

const closeErrorMessage = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc'|| evt.type === 'mousedown' || evt.key === 'Enter') {
    evt.preventDefault();
    errorMessage.remove();
    assignPageActiveStatus();
    document.removeEventListener('keydown', closeErrorMessage);
    document.removeEventListener('mousedown', closeErrorMessage);
    errorButtom.removeEventListener('keydown', closeErrorMessage);
  }
}

const getErrorMessage = () => {
  errorMessage.style.zIndex = 1000;
  main.append(errorMessage);
  assignPageInactiveStatus();
  document.addEventListener('keydown', closeErrorMessage);
  document.addEventListener('mousedown', closeErrorMessage);
  errorButtom.addEventListener('keydown', closeErrorMessage);
}

const setSendingData = () => {
  ad.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(getSuccessMessage, getErrorMessage, new FormData(evt.target));
  });
};

setStartingAddress();
setMinPricePerNight(houseType.value);
syncSelectByIndex(timesIn, timesOut);
setSendingData();

export {};
