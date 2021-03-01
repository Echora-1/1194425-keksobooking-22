const form = document.querySelector('.map__filters');
const housingType = form.querySelector('[name="housing-type"]');
const housingPrice = form.querySelector('[name="housing-price"]');
const housingRooms = form.querySelector('[name="housing-rooms"]');
const housingGuests = form.querySelector('[name="housing-guests"]');
const housingFeatures = form.querySelector('#housing-features');

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
  if(selectedFeatures.length === 0){
    return match;
  }
  selectedFeatures.forEach(element => {
    if(!(features.includes(element))) {
      match = false;
    }
  });
  return match;
}

const getAdMatch = (ad) => {
  let match = true;
  const price = getPrice(housingPrice.value);
  const features = Array.from(housingFeatures.children).filter(element => element.checked);
  const valueFeatures = features.map(item => item.value);
  const adFeatures = ad.offer.features;
  if(ad.offer.type !== housingType.value && housingType.value !== 'any') {
    match = false;
    return match;
  }
  if(!(price[0] <= ad.offer.price &&  ad.offer.price < price[1])) {
    match = false;
    return match;
  }
  if(ad.offer.rooms !== Number(housingRooms.value) && housingRooms.value !== 'any') {
    match = false;
    return match;
  }
  if(ad.offer.guests !== Number(housingGuests.value) && housingGuests.value !== 'any') {
    match = false;
    return match;
  }

  match = getMatchingFeatures(valueFeatures, adFeatures);
  return match;
};

const setMapChanges = (cb) => {
  form.addEventListener('change', (evt) => {
    if(evt.target.tagName === 'SELECT') {
      cb();
    }
  });
  housingFeatures.addEventListener('change', (evt) => {
    if(evt.target.tagName === 'INPUT') {
      cb();
    }
  });
};

export {getAdMatch, setMapChanges};
