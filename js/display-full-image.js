import {isEscapeKey} from './util.js';

const body = document.body;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture (evt) {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onPreviewClick = (evt) => {
  if (evt.target.matches('img.picture__img')) {
    evt.preventDefault();
    openBigPicture();
  }
};

picturesContainer.addEventListener('click', onPreviewClick);
bigPictureCancel.addEventListener('click', closeBigPicture);
