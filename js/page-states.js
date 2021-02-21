const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const adFormHeader = adForm.querySelector('.ad-form-header');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const getActiveOrInactiveStatus = (status) => {
  const elements = [...adFormElements, adFormHeader, ...mapFiltersElements, mapFeatures];

  if(status === 'inactive') {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    elements.forEach((element) => element.setAttribute('disabled', ''));
  }
  else if(status === 'active') {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    elements.forEach((element) => element.removeAttribute('disabled', ''));
  }
  else {
    throw new Error('для изменения статуса страницы используйте аргумент inactive или active');
  }
};

export {getActiveOrInactiveStatus};
