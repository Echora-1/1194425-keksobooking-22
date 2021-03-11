import {assignActiveStatus as assignPageActiveStatus, assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {clear} from './form.js';

const mainElement = document.querySelector('main');
const successElement = document.querySelector('#success').content.querySelector('.success');
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = errorElement.querySelector('.error__button');


const closeSuccessKeydown = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    successElement.remove();
    assignPageActiveStatus();
    document.removeEventListener('keydown', closeSuccessKeydown);
  }
}

const closeSuccessMousedown = (evt) => {
  if(evt.type === 'mousedown' && evt.which === 1 ) {
    evt.preventDefault();
    successElement.remove();
    assignPageActiveStatus();
    document.removeEventListener('mousedown', closeSuccessMousedown);
  }
}

const getSuccess = () => {
  successElement.style.zIndex = 1000;
  mainElement.append(successElement);
  clear();
  assignPageInactiveStatus();
  document.addEventListener('keydown', closeSuccessKeydown);
  document.addEventListener('mousedown', closeSuccessMousedown);
}

const closeErrorKeydown = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    errorElement.remove();
    assignPageActiveStatus();
    document.removeEventListener('keydown', closeErrorKeydown);
  }
}

const closeErrorMousedown = (evt) => {
  if(evt.type === 'mousedown' && evt.which === 1) {
    evt.preventDefault();
    errorElement.remove();
    assignPageActiveStatus();
    document.removeEventListener('mousedown', closeErrorMousedown);
  }
}

const closeErrorButton = (evt) => {
  if(evt.type === 'click') {
    evt.preventDefault()
    errorElement.remove();
    assignPageActiveStatus();
    document.removeEventListener('mousedown', closeErrorButton);
  }
}

const getError = () => {
  errorElement.style.zIndex = 1000;
  mainElement.append(errorElement);
  assignPageInactiveStatus();
  document.addEventListener('keydown', closeErrorKeydown);
  document.addEventListener('mousedown', closeErrorMousedown);
  errorButtonElement.addEventListener('click', closeErrorButton);
}

export {getSuccess, getError}
