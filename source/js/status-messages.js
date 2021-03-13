import {assignActiveStatus as assignPageActiveStatus, assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {clear} from './form.js';
import {isEscPressed, isLeftMouseButtonPressed} from './utils';

const mainElement = document.querySelector('main');
const successElement = document.querySelector('#success').content.querySelector('.success');
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = errorElement.querySelector('.error__button');

const сloseSuccessMessage = (evt) => {
  evt.preventDefault();
  successElement.remove();
  assignPageActiveStatus();
  document.removeEventListener('keydown', onSuccessMessageClosedPressingEsc);
  document.removeEventListener('mousedown', onSuccessMessageClosedMouseClick);
};

const onSuccessMessageClosedPressingEsc = (evt) => {
  if(isEscPressed(evt)) {
    сloseSuccessMessage(evt);
  }
}

const onSuccessMessageClosedMouseClick = (evt) => {
  if(isLeftMouseButtonPressed(evt)) {
    сloseSuccessMessage(evt);
  }
}

const getSuccess = () => {
  successElement.style.zIndex = 1000;
  mainElement.append(successElement);
  window.scrollTo(0, 0);
  clear();
  assignPageInactiveStatus();
  document.addEventListener('keydown', onSuccessMessageClosedPressingEsc);
  document.addEventListener('mousedown', onSuccessMessageClosedMouseClick);
}

const сloseErrorMessage = (evt) => {
  evt.preventDefault();
  errorElement.remove();
  assignPageActiveStatus();
  document.removeEventListener('keydown', onErrorMessageClosedPressingEsc);
  document.removeEventListener('mousedown', onErrorMessageClosedMouseClick);
  errorButtonElement.removeEventListener('click', onErrorMessageClosedPressedButton);
};

const onErrorMessageClosedPressingEsc = (evt) => {
  if(isEscPressed(evt)) {
    сloseErrorMessage(evt);
  }
}

const onErrorMessageClosedMouseClick = (evt) => {
  if(isLeftMouseButtonPressed(evt)) {
    сloseErrorMessage(evt);
  }
}

const onErrorMessageClosedPressedButton = (evt) => {
  if(evt.type === 'click') {
    сloseErrorMessage(evt);
  }
}

const getError = () => {
  errorElement.style.zIndex = 1000;
  mainElement.append(errorElement);
  assignPageInactiveStatus();
  document.addEventListener('keydown', onErrorMessageClosedPressingEsc);
  document.addEventListener('mousedown', onErrorMessageClosedMouseClick);
  errorButtonElement.addEventListener('click', onErrorMessageClosedPressedButton);
}

export {getSuccess, getError}
