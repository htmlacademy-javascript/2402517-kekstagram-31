import { resetImageEffect } from './edit-effects-upload-image.js';
import { resetImageScale } from './edit-scale-upload-image.js';
import { isEscapeKey } from '../util.js';
import { sendFormData } from '../data/api.js';
import { showCustomAlert, showError, AlertStatus } from './display-alert.js';
import { isValidForm, resetValidation } from './validate-upload-form.js';

const body = document.body;
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadField = imageUploadForm.querySelector('.img-upload__input');
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
const commentField = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const imageUploadEffectPreviews = imageUploadForm.querySelectorAll('.effects__preview');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const buttonCancelOverlay = imageUploadOverlay.querySelector('.img-upload__cancel');
const IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/svg+xml'
];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    const errorAlert = document.querySelector('.error');

    if (!(evt.target.matches('input.text__hashtags') || evt.target.matches('textarea.text__description') || errorAlert)) {
      closeOverlay();
    }
  }
};

const resetFormFields = () => {
  imageUploadField.value = '';
  hashtagsField.value = '';
  commentField.value = '';
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

function openOverlay () {
  imageUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeOverlay () {
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetFormFields();
  resetImageScale();
  resetImageEffect();
  resetValidation();

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onImageUploadFormChange = () => {
  const file = imageUploadField.files[0];
  const fileType = file.type;
  const isCorrectType = IMAGE_TYPES.includes(fileType);

  if (!isCorrectType) {
    const customTypeError = { 'message': 'Неподходящий тип файла. Выберите изображение' };
    showError(customTypeError);
    imageUploadField.value = '';

    return;
  }

  const url = URL.createObjectURL(file);
  imageUploadPreview.src = url;
  imageUploadEffectPreviews.forEach((element) => {
    element.style.backgroundImage = `url(${url})`;
  });

  openOverlay();
};

const onImageUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (!isValidForm()) {
    return;
  }

  blockSubmitButton();

  sendFormData(evt.target)
    .then(() => {
      closeOverlay();
      showCustomAlert(AlertStatus.SUCCESS);
    })
    .catch(() => {
      showCustomAlert(AlertStatus.ERROR);
    })
    .finally(() => unblockSubmitButton());
};


imageUploadForm.addEventListener('change', onImageUploadFormChange);
buttonCancelOverlay.addEventListener('click', () => closeOverlay());
imageUploadForm.addEventListener('submit', onImageUploadFormSubmit);
