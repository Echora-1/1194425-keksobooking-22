const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const adFormHeader = adForm.querySelector('.ad-form-header');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const assignDisabledStatus = (boolean) => {
  const elemnts = [];

  elemnts.push(...adFormElements, adFormHeader, ...mapFiltersElements, mapFeatures);

  if(boolean) {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    elemnts.forEach((element) => element.setAttribute('disabled', ''));
  }
  else {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    elemnts.forEach((element) => element.removeAttribute('disabled', ''));
  }
};

export {assignDisabledStatus};
