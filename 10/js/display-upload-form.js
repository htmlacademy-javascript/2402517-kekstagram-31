import { isEscapeKey } from './util.js';

const body = document.body;
const formImageUpload = document.querySelector('.img-upload__form');
const inputImageUpload = formImageUpload.querySelector('.img-upload__input');
const overlayImageUpload = document.querySelector('.img-upload__overlay');
const buttonCancelOverlay = document.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => { // в утил?
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

  document.removeEventListener('keydown', onDocumentKeydown);
}

formImageUpload.addEventListener('change', openOverlay);
buttonCancelOverlay.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeOverlay();
});
