import {setStartPosition, recordStartingAddress, setMoveMainMarker} from './map.js';
import {sendData} from './server-connection.js';
import {getSuccess as getSuccessMessage, getError as getErrorMessage} from './status-messages.js';


const MINIMUM_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const MAX_PRICE = 1000000;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const ad = document.querySelector('.ad-form');
const addressInput = ad.querySelector('#address');
const titleInput = ad.querySelector('#title');
const priceInput = ad.querySelector('#price');
const pricePerNight = ad.querySelector('#price');
const houseType = ad.querySelector('#type');
const timesIn = ad.querySelector('#timein');
const timesOut = ad.querySelector('#timeout');
const numberOfRooms = ad.querySelector('#room_number');
const numberOfGuests = ad.querySelector('#capacity');
const mapFilters = document.querySelector('.map__filters');
const clearButton = ad.querySelector('.ad-form__reset');


const setMinPricePerNight = (houseType) => {
  pricePerNight.setAttribute('placeholder', String(MINIMUM_PRICES[houseType]));
  pricePerNight.setAttribute('min', String(MINIMUM_PRICES[houseType]));
  pricePerNight.setAttribute('max', String(MAX_PRICE));
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

const setTitleValidation = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Заголовок долже состоять минимум из 30-ти символов ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  }
  else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Заголовок может состоять максимум из 100 символов удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  }
  else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

titleInput.addEventListener('input', setTitleValidation);

const setPriceValidation = () => {
  const valuePrice = priceInput.value;

  if(valuePrice > MAX_PRICE){
    priceInput.setCustomValidity(`Цена за ночь не может превышать ${MAX_PRICE}.`);
  }
  else if (Number(priceInput.getAttribute('min')) > valuePrice) {
    priceInput.setCustomValidity(`Цена за ночь не может быть меньше ${priceInput.getAttribute('min')}.`);
  }
  else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
};

houseType.addEventListener('change', setPriceValidation);
priceInput.addEventListener('input', setPriceValidation);

const setCapacityValidation = () => {
  if(Number(numberOfRooms.value) === 1 && Number(numberOfGuests.value) > 1 ) {
    numberOfRooms.setCustomValidity('1 комната не может вмещать больше 1 гостя.');
  }
  else if(Number(numberOfRooms.value) === 2 && Number(numberOfGuests.value) > 2 ) {
    numberOfRooms.setCustomValidity('2 комнаты не могут вмещать больше 2 гостей.');
  }
  else if(Number(numberOfRooms.value) !== 100 && Number(numberOfGuests.value) === 0) {
    numberOfRooms.setCustomValidity('Не для гостей доступны только 100 комнат.');
  }
  else if(Number(numberOfRooms.value) === 100 && Number(numberOfGuests.value) !== 0) {
    numberOfRooms.setCustomValidity('100 комнат доступны только не для гостей.');
  }
  else {
    numberOfRooms.setCustomValidity('');
  }
  numberOfRooms.reportValidity();
}

numberOfRooms.addEventListener('change', setCapacityValidation);
numberOfGuests.addEventListener('change', setCapacityValidation);

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


