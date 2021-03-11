import {setStartPosition, recordStartingAddress, setMoveMainMarker, createAdMarkers} from './map.js';
import {sendData, getData} from './server-connection.js';
import {getSuccess as getSuccessMessage, getError as getErrorMessage} from './status-messages.js';
import {createImage} from './element-constructor.js';

const MINIMUM_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const adMainElement = document.querySelector('.ad-form');
const addressInputElement = adMainElement.querySelector('#address');
const titleInputElement = adMainElement.querySelector('#title');
const priceInputElement = adMainElement.querySelector('#price');
const pricePerNightElement = adMainElement.querySelector('#price');
const houseTypeElement = adMainElement.querySelector('#type');
const timesInElement = adMainElement.querySelector('#timein');
const timesOutElement = adMainElement.querySelector('#timeout');
const numberOfRoomsElement = adMainElement.querySelector('#room_number');
const numberOfGuestsElement = adMainElement.querySelector('#capacity');
const clearButtonElement = adMainElement.querySelector('.ad-form__reset');
const avatarLoadButtonElement = adMainElement.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = adMainElement.querySelector('.ad-form-header__preview');
const avatarElement = avatarPreviewElement.querySelector('img');
const photoHousingLoadButtonElement = adMainElement.querySelector('.ad-form__upload input[type=file]');
const photoHousinPreviewElement = adMainElement.querySelector('.ad-form__photo');
const mapFiltersElement = document.querySelector('.map__filters');

const setMinPricePerNight = (houseTypeElement) => {
  pricePerNightElement.setAttribute('placeholder', String(MINIMUM_PRICES[houseTypeElement]));
  pricePerNightElement.setAttribute('min', String(MINIMUM_PRICES[houseTypeElement]));
};

houseTypeElement.addEventListener('change', () => {
  setMinPricePerNight(houseTypeElement.value);
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
  adMainElement.reset();
  mapFiltersElement.reset();
  setStartPosition();
  recordStartingAddress(addressInputElement);
  getData((data) => {
    createAdMarkers(data);
  });
};

clearButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  clear();
});

const setTitleValidation = () => {
  const valueLength = titleInputElement.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInputElement.setCustomValidity(`Заголовок долже состоять минимум из 30-ти символов ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  }
  else if (valueLength > MAX_TITLE_LENGTH) {
    titleInputElement.setCustomValidity('Заголовок может состоять максимум из 100 символов удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  }
  else {
    titleInputElement.setCustomValidity('');
  }
  titleInputElement.reportValidity();
};

titleInputElement.addEventListener('input', setTitleValidation);

const setPriceValidation = () => {
  const valuePrice = priceInputElement.value;

  if (Number(priceInputElement.getAttribute('min')) > valuePrice) {
    priceInputElement.setCustomValidity(`Цена за ночь не может быть меньше ${priceInputElement.getAttribute('min')}.`);
  }
  else {
    priceInputElement.setCustomValidity('');
  }
  priceInputElement.reportValidity();
};

houseTypeElement.addEventListener('change', setPriceValidation);
priceInputElement.addEventListener('input', setPriceValidation);

const setCapacityValidation = () => {
  if(Number(numberOfRoomsElement.value) === 100 && Number(numberOfGuestsElement.value) !== 0) {
    numberOfGuestsElement.setCustomValidity('100 комнат доступны только не для гостей.');
  }
  else if(Number(numberOfRoomsElement.value) !== 100 && Number(numberOfGuestsElement.value) === 0) {
    numberOfGuestsElement.setCustomValidity('Не для гостей доступны только 100 комнат.');
  }
  else if(Number(numberOfRoomsElement.value) < Number(numberOfGuestsElement.value)) {
    numberOfGuestsElement.setCustomValidity('Количество гостей не может быть больше комнат.');
  }
  else {
    numberOfGuestsElement.setCustomValidity('');
  }
  numberOfGuestsElement.reportValidity();
}

numberOfRoomsElement.addEventListener('change', setCapacityValidation);
numberOfGuestsElement.addEventListener('change', setCapacityValidation);

const setloadImage = (loadButton, preview) => {
  const file = loadButton.files[0];
  const fileName = loadButton.files[0].name.toLowerCase();
  let photo = preview;
  const matches = FILE_TYPES.some((extension) => {
    return fileName.endsWith(extension);
  });

  if(photo.tagName === 'DIV') {
    photo = createImage();
    preview.style.position = 'relative';
    preview.appendChild(photo);
  }

  if(matches){
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      photo.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

avatarLoadButtonElement.addEventListener('change',() => setloadImage(avatarLoadButtonElement, avatarElement));
photoHousingLoadButtonElement.addEventListener('change',() => setloadImage(photoHousingLoadButtonElement, photoHousinPreviewElement));

const setSendingData = () => {
  adMainElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(getSuccessMessage, getErrorMessage, new FormData(evt.target));
  });
};

recordStartingAddress(addressInputElement);
setMoveMainMarker(addressInputElement);
setMinPricePerNight(houseTypeElement.value);
setCapacityValidation();
syncSelectByIndex(timesInElement, timesOutElement);
setSendingData();


export {clear};
