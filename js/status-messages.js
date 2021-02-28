import {assignActiveStatus as assignPageActiveStatus, assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {clear} from './form.js';

const main = document.querySelector('main');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = error.querySelector('.error__button');


const closeSuccessKeydown = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    success.remove();
    assignPageActiveStatus();
    document.removeEventListener('keydown', closeSuccessKeydown);
  }
}

const closeSuccessMousedown = (evt) => {
  if(evt.type === 'mousedown' && evt.which === 1 ) {
    evt.preventDefault();
    success.remove();
    assignPageActiveStatus();
    document.removeEventListener('mousedown', closeSuccessMousedown);
  }
}

const getSuccess = () => {
  success.style.zIndex = 1000;
  main.append(success);
  clear();
  assignPageInactiveStatus();
  document.addEventListener('keydown', closeSuccessKeydown);
  document.addEventListener('mousedown', closeSuccessMousedown);
}

const closeErrorKeydown = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    error.remove();
    assignPageActiveStatus();
    document.removeEventListener('keydown', closeErrorKeydown);
  }
}

const closeErrorMousedown = (evt) => {
  if(evt.type === 'mousedown' && evt.which === 1) {
    evt.preventDefault();
    error.remove();
    assignPageActiveStatus();
    document.removeEventListener('mousedown', closeErrorMousedown);
  }
}

const closeErrorButton = (evt) => {
  if(evt.type === 'click') {
    evt.preventDefault()
    error.remove();
    assignPageActiveStatus();
    document.removeEventListener('mousedown', closeErrorButton);
  }
}

const getError = () => {
  error.style.zIndex = 1000;
  main.append(error);
  assignPageInactiveStatus();
  document.addEventListener('keydown', closeErrorKeydown);
  document.addEventListener('mousedown', closeErrorMousedown);
  errorButton.addEventListener('click', closeErrorButton);
}

export {getSuccess, getError}
