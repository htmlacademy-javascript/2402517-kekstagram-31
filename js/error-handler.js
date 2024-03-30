import { getTemplateElement } from './util.js';

const ALERT_TIME = 5000;

const showError = (err) => {
  const body = document.body;
  const errorAlert = getTemplateElement('data-error', 'data-error').cloneNode(true);
  const errorAlertText = errorAlert.querySelector('.data-error__title');
  errorAlertText.textContent = err.message;
  body.append(errorAlert);
  setTimeout(() => {
    errorAlert.remove();
  }, ALERT_TIME);
};

export { showError };
