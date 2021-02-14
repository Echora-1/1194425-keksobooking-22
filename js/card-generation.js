const TEMPLATE_CARD = document.querySelector('#card').content.querySelector('.popup');

const getCard = (item) => {
  const ad = TEMPLATE_CARD.cloneNode(true);
  let buildingType = '';
  switch (item.offer.type) {
    case 'flat':
      buildingType = 'Квартира';
      break;
    case 'bungalow':
      buildingType = 'Бунгало';
      break;
    case 'house':
      buildingType = 'Дом';
      break;
    case 'palace':
      buildingType = 'Дворец';
      break;
  }
  let adRooms = item.offer.rooms > 4 ? 'комнат' : 'комнаты';
  if(item.offer.rooms === 1) {
    adRooms = 'комнатa';
  }
  const cloneListPhoto = ad.querySelector('.popup__photos').cloneNode(true);

  ad.querySelector('.popup__title').textContent = item.offer.title;
  ad.querySelector('.popup__text--address').textContent = item.offer.address;
  ad.querySelector('.popup__text--price').textContent = String(item.offer.price) + ' ₽/ночь';
  ad.querySelector('.popup__type').textContent = buildingType;
  ad.querySelector('.popup__text--capacity').textContent = String(item.offer.rooms) + ` ${adRooms} для `  + String(item.offer.guests) + ' гостей';
  ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;

  ad.querySelector('.popup__features').textContent = '';
  for (let i = 0; i < item.offer.features.length; i++ ) {
    const adFeature = document.createElement('li');
    adFeature.classList.add('popup__features');
    adFeature.classList.add('popup__features--' + item.offer.features[i]);
    adFeature.textContent = item.offer.features[i];
    ad.querySelector('.popup__features').appendChild(adFeature);
  }

  ad.querySelector('.popup__description').textContent = buildingType + ' ' + item.offer.description;

  ad.querySelector('.popup__photos').textContent = '';
  for (let i = 0; i < item.offer.photos.length; i++ ) {
    const clonePhoto = cloneListPhoto.querySelector('.popup__photo').cloneNode(true);
    clonePhoto.src = item.offer.photos[i];
    ad.querySelector('.popup__photos').appendChild(clonePhoto);
  }

  ad.querySelector('.popup__avatar').src = item.author.avatar;
  return ad;
};

export {getCard};
