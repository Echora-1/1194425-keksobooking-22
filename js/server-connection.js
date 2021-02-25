import {showMessage as showAlert} from './alerts.js';

const RECEIVE_ERROR_MESSAGE = 'При загрузке данных с сервера произошла ошибка. Попробуйте позже';
const getUrl = 'https://22.javascript.pages.academy/keksobooking/data';
const sendUrl = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(getUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(RECEIVE_ERROR_MESSAGE);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert(RECEIVE_ERROR_MESSAGE);
    });
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    sendUrl,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
