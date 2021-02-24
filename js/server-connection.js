const ALERT_SHOW_TIME = 5000;
const RECEIVE_ERROR_MESSAGE = 'При загрузке данных с сервера произошла ошибка. Попробуйте позже';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = '18px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff6d51';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
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
    'https://22.javascript.pages.academy/keksobooking',
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
