import {removeСhildByClass} from './utils.js';

const template_card = document.querySelector('#card').content.querySelector('.popup');

const getTranslationBuildingType = (word) => {
  switch (word) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
};

const getDeclensionWordRoom = (quantity) => {
  const remainder = quantity % 100;
  const secondRemainder = remainder % 10;

  if(remainder > 4 && remainder < 21) {
    return 'комнат'
  }
  if(secondRemainder > 1 && secondRemainder < 5) {
    return 'комнаты'
  }
  if(secondRemainder === 1) {
    return 'комнатa'
  }
  return 'комнат';
}

const getFeatureListItem = (feature) => {
  const item = document.createElement('li');

  item.classList.add('popup__features');
  item.classList.add(`popup__features--${feature}`);
  item.textContent = feature;

  return item;
};

const getPhotoListItem = (templatePhoto, photoSrc) => {
  const photo = templatePhoto.cloneNode(true);
  photo.src = photoSrc;
  return photo;
};

const createAd = (item) => {
  const ad = template_card.cloneNode(true);
  const buildingType = getTranslationBuildingType(item.offer.type);
  const roomDeclension = getDeclensionWordRoom(item.offer.rooms)
  const photosList =  ad.querySelector('.popup__photos');
  const photosListItem = ad.querySelector('.popup__photo');
  const featureList = ad.querySelector('.popup__features');

  ad.querySelector('.popup__title').textContent = item.offer.title;
  ad.querySelector('.popup__text--address').textContent = item.offer.address;
  ad.querySelector('.popup__text--price').textContent = `${String(item.offer.price)} ₽/ночь`;
  ad.querySelector('.popup__type').textContent = buildingType;
  ad.querySelector('.popup__text--capacity').textContent = `${String(item.offer.rooms)} ${roomDeclension} для ${String(item.offer.guests)} гостей`;
  ad.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  removeСhildByClass(featureList, 'popup__feature');
  item.offer.features.forEach((element) => featureList.appendChild(getFeatureListItem(element)));

  ad.querySelector('.popup__description').textContent = `${buildingType} ${item.offer.description}`;

  removeСhildByClass(photosList, 'popup__photo');
  item.offer.photos.forEach((element) => photosList.appendChild(getPhotoListItem(photosListItem, element)));

  ad.querySelector('.popup__avatar').src = item.author.avatar;

  return ad;
};

export {createAd};
