import { getTemplateElement } from './util.js';
import { isEscapeKey } from './util.js';

const ALERT_TIME = 5000;
const AlertStatus = {
  SUCCESS: 'success',
  ERROR: 'error'
};
const body = document.body;

const showError = (err) => {
  const errorAlert = getTemplateElement('data-error', 'data-error').cloneNode(true);
  const errorAlertText = errorAlert.querySelector('.data-error__title');
  errorAlertText.textContent = err.message;
  body.append(errorAlert);
  setTimeout(() => {
    errorAlert.remove();
  }, ALERT_TIME);
};

const showCustomAlert = (status = AlertStatus.SUCCESS) => { // status в контексте разметки
  const customAlert = getTemplateElement(status, status).cloneNode(true);
  body.append(customAlert);


  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeAlert();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest(`.${status}__inner`)) {
      closeAlert();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  customAlert.querySelector(`.${status}__button`).addEventListener('click', () => {
    closeAlert();
  });

  function closeAlert () {
    customAlert.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};


export { showError, showCustomAlert, AlertStatus };
