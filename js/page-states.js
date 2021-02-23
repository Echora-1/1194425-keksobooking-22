const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const adFormHeader = adForm.querySelector('.ad-form-header');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
const elementsForm = [...adFormElements, adFormHeader, ...mapFiltersElements, mapFeatures];

const assignInactiveStatus = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  elementsForm.forEach((element) => element.setAttribute('disabled', ''));
};

const assignActiveStatus = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  elementsForm.forEach((element) => element.removeAttribute('disabled', ''));
};

export {assignInactiveStatus, assignActiveStatus}
