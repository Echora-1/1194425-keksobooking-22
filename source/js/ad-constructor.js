import {removeСhildByClass} from './utils.js';

const templateMainElement = document.querySelector('#card').content.querySelector('.popup');

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

  item.classList.add('popup__feature');
  item.classList.add(`popup__feature--${feature}`);

  return item;
};

const getPhotoListItem = (templateMainElementPhoto, photoSrc) => {
  const photo = templateMainElementPhoto.cloneNode(true);
  photo.src = photoSrc;
  return photo;
};

const create = (item) => {
  const adMainElement = templateMainElement.cloneNode(true);
  const buildingType = getTranslationBuildingType(item.offer.type);
  const roomDeclension = getDeclensionWordRoom(item.offer.rooms)
  const photosListElement =  adMainElement.querySelector('.popup__photos');
  const photosListItemElement = adMainElement.querySelector('.popup__photo');
  const featureListElement = adMainElement.querySelector('.popup__features');

  adMainElement.querySelector('.popup__title').textContent = item.offer.title;
  adMainElement.querySelector('.popup__text--address').textContent = item.offer.address;
  adMainElement.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  adMainElement.querySelector('.popup__type').textContent = buildingType;
  adMainElement.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} ${roomDeclension} для ${item.offer.guests} гостей`;
  adMainElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  if(item.offer.features.length === 0) {
    featureListElement.remove();
  }
  else {
    removeСhildByClass(featureListElement, 'popup__feature');
    item.offer.features.forEach((element) => featureListElement.appendChild(getFeatureListItem(element)));
  }

  if(item.offer.description.length === 0) {
    removeСhildByClass(adMainElement, 'popup__description');
  }
  else {
    adMainElement.querySelector('.popup__description').textContent = item.offer.description;
  }

  if(item.offer.photos.length === 0) {
    photosListElement.remove();
  }
  else {
    removeСhildByClass(photosListElement, 'popup__photo');
    item.offer.photos.forEach((element) => photosListElement.appendChild(getPhotoListItem(photosListItemElement, element)));
  }

  if(item.author.avatar.length !== 0) {
    adMainElement.querySelector('.popup__avatar').src = item.author.avatar;
  }

  return adMainElement;
};

export {create};
