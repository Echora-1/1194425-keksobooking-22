const adFormMainElement = document.querySelector('.ad-form');
const adFormElements = adFormMainElement.querySelectorAll('.ad-form__element');
const adFormHeaderElement = adFormMainElement.querySelector('.ad-form-header');
const mapFiltersMainElement = document.querySelector('.map__filters');
const mapFiltersElements = mapFiltersMainElement.querySelectorAll('.map__filter');
const mapFeaturesElement = mapFiltersMainElement.querySelector('.map__features');
const formElements = [...adFormElements, adFormHeaderElement, ...mapFiltersElements, mapFeaturesElement];

const assignInactiveStatus = () => {
  adFormMainElement.classList.add('ad-form--disabled');
  mapFiltersMainElement.classList.add('map__filters--disabled');
  formElements.forEach((element) => element.setAttribute('disabled', ''));
};

const assignActiveStatus = () => {
  adFormMainElement.classList.remove('ad-form--disabled');
  mapFiltersMainElement.classList.remove('map__filters--disabled');
  formElements.forEach((element) => element.removeAttribute('disabled', ''));
};

export {assignInactiveStatus, assignActiveStatus}
