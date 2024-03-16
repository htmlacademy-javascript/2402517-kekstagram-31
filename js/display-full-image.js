import {isEscapeKey} from './util.js';
import {photos} from './display-previews.js';

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

function openBigPicture (evt) {
  const commentShownCount = 6;
  const previewId = Number(evt.target.parentNode.dataset.id);
  const currentPhoto = photos.find((photo) => photo.id === previewId);
  const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');

  bigPictureImage.src = currentPhoto.url;
  bigPictureImage.alt = currentPhoto.description;
  bigPicture.querySelector('.likes-count').textContent = currentPhoto.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = commentShownCount;
  bigPicture.querySelector('.social__comment-total-count').textContent = currentPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = currentPhoto.description;

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
    openBigPicture(evt);
  }
};

picturesContainer.addEventListener('click', onPreviewClick);
bigPictureCancel.addEventListener('click', closeBigPicture);
