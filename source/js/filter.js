const formMainElement = document.querySelector('.map__filters');
const housingTypeElement = formMainElement.querySelector('[name="housing-type"]');
const housingPriceElement = formMainElement.querySelector('[name="housing-price"]');
const housingRoomsElement = formMainElement.querySelector('[name="housing-rooms"]');
const housingGuestsElement = formMainElement.querySelector('[name="housing-guests"]');
const housingFeaturesElement = formMainElement.querySelector('#housing-features');

const getPrice = (value) => {
  switch(value) {
    case 'any':
      return [0, 10000000];
    case 'low':
      return [0, 10000];
    case 'middle':
      return [10000, 50000];
    case 'high':
      return [50000, 10000000];
  }
}

const getMatchingFeatures = (selectedFeatures, features) => {
  let match = true;
  if(selectedFeatures.length === 0) {
    return match;
  }
  selectedFeatures.forEach(element => {
    if(!(features.includes(element.value))) {
      match = false;
    }
  });
  return match;
}

const getAdMatch = (ad) => {
  let match = true;
  const price = getPrice(housingPriceElement.value);
  const selectedFeatures = Array.from(housingFeaturesElement.querySelectorAll('input:checked'));
  const adFeatures = ad.offer.features;
  if(ad.offer.type !== housingTypeElement.value && housingTypeElement.value !== 'any') {
    match = false;
    return match;
  }
  if(!(price[0] <= ad.offer.price &&  ad.offer.price < price[1])) {
    match = false;
    return match;
  }
  if(ad.offer.rooms !== Number(housingRoomsElement.value) && housingRoomsElement.value !== 'any') {
    match = false;
    return match;
  }
  if(ad.offer.guests !== Number(housingGuestsElement.value) && housingGuestsElement.value !== 'any') {
    match = false;
    return match;
  }

  match = getMatchingFeatures(selectedFeatures, adFeatures);
  return match;
};

const setMapChanges = (cb) => {
  formMainElement.addEventListener('change', (evt) => {
    if(evt.target.tagName === 'SELECT') {
      cb();
    }
  });
  housingFeaturesElement.addEventListener('change', (evt) => {
    if(evt.target.tagName === 'INPUT') {
      cb();
    }
  });
};

export {getAdMatch, setMapChanges};
