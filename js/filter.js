const form = document.querySelector('.map__filters');
const housingType = form.querySelector('[name="housing-type"]');
const housingPrice = form.querySelector('[name="housing-price"]');
const housingRooms = form.querySelector('[name="housing-rooms"]');
const housingGuests = form.querySelector('[name="housing-guests"]');
const housingFeatures = form.querySelector('#housing-features');

const getPrice = (value) => {
  switch(value) {
    case 'any':
      return [0, 0];
    case 'low':
      return [0, 10000];
    case 'middle':
      return [10000, 50000];
    case 'high':
      return [50000, 1000000];
  }
}

const getFeatureCoincidenceRank = (firstFeatures, secondFeatures) => {
  let rank = 0

  firstFeatures.forEach(element => {
    if(secondFeatures.includes(element)) {
      rank += 3;
    }
  });
  
  return rank;
}

const getAdMatchRank = (ad) => {
  let rank = 0;
  const price = getPrice(housingPrice.value);
  const features = Array.from(housingFeatures.children).filter(element => element.checked);
  const selectedFeatures = features.map(item => item.value);
  const adFeatures = ad.offer.features;

  if(ad.offer.type === housingType.value) {
    rank += 3;
  }
  if(price[0] < ad.offer.price &&  ad.offer.price < price[1]) {
    rank +=3;
  }
  if(ad.offer.rooms === Number(housingRooms.value)) {
    rank += 3;
  }
  if(ad.offer.rooms > Number(housingRooms.value)) {
    rank++;
  }
  if(ad.offer.guests === Number(housingGuests.value)) {
    rank += 3;
  }
  if(ad.offer.guests > Number(housingGuests.value)) {
    rank++;
  }

  rank += getFeatureCoincidenceRank(selectedFeatures, adFeatures);

  return rank;
};

const sortRank = (firstAd, secondAd ) => {
  const firstRank = getAdMatchRank(firstAd);
  const secondRank = getAdMatchRank(secondAd);

  return secondRank - firstRank;
}

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

export {sortRank, setMapChanges};
