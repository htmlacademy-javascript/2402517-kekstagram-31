import { resetImageEffect } from './edit-effects-upload-image.js';
import { resetImageScale } from './edit-scale-upload-image.js';
import { isEscapeKey } from './util.js';
import { sendFormData } from './api.js';
import { showCustomAlert } from './display-alert.js';
import { AlertStatus } from './display-alert.js';
import { isValidForm } from './validate-upload-form.js';

const body = document.body;
const formImageUpload = document.querySelector('.img-upload__form');
const inputImageUpload = formImageUpload.querySelector('.img-upload__input');
const overlayImageUpload = document.querySelector('.img-upload__overlay');
const buttonCancelOverlay = document.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (!(evt.target.matches('input.text__hashtags') || evt.target.matches('textarea.text__description'))) {
      closeOverlay();
    }
  }
};

function openOverlay () {
  overlayImageUpload.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeOverlay () {
  overlayImageUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  inputImageUpload.value = '';
  resetImageScale();
  resetImageEffect();

  document.removeEventListener('keydown', onDocumentKeydown);
}

formImageUpload.addEventListener('change', () => openOverlay());
buttonCancelOverlay.addEventListener('click', () => closeOverlay());
formImageUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!isValidForm()) {
    return;
  }

  sendFormData(evt.target)
    .then(() => {
      closeOverlay();
      showCustomAlert(AlertStatus.SUCCESS);
    })
    .catch(() => {
      showCustomAlert(AlertStatus.ERROR);
    });
});
