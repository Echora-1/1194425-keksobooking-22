import {assignActiveStatus as assignPageActiveStatus, assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {clear} from './form.js';

const main = document.querySelector('main');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = error.querySelector('.error__button');


const closeSuccess = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc'|| (evt.type === 'mousedown' && evt.which === 1 )) {
    evt.preventDefault();
    success.remove();
    assignPageActiveStatus();
    document.removeEventListener('keydown', closeSuccess);
    document.removeEventListener('mousedown', closeSuccess);
  }
}

const getSuccess = () => {
  success.style.zIndex = 1000;
  main.append(success);
  clear();
  assignPageInactiveStatus();
  document.addEventListener('keydown', closeSuccess);
  document.addEventListener('mousedown', closeSuccess);
}

const closeError = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc'|| (evt.type === 'mousedown' && evt.which === 1 ) || evt.key === 'Enter') {
    evt.preventDefault();
    error.remove();
    assignPageActiveStatus();
    document.removeEventListener('keydown', closeError);
    document.removeEventListener('mousedown', closeError);
    errorButton.removeEventListener('keydown', closeError);
  }
}

const getError = () => {
  error.style.zIndex = 1000;
  main.append(error);
  assignPageInactiveStatus();
  document.addEventListener('keydown', closeError);
  document.addEventListener('mousedown', closeError);
  errorButton.addEventListener('keydown', closeError);
}

export {getSuccess, getError}
