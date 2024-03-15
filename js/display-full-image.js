import {showOrHide} from './util.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const onPreviewClick = (evt) => {
  if (evt.target.matches('img.picture__img')) {
    showOrHide(bigPicture);
  }
};

picturesContainer.addEventListener('click', onPreviewClick);
