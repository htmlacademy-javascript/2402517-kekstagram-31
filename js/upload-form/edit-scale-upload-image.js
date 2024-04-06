import { DEFAULT_IMAGE_SCALE, MAX_IMAGE_SCALE, MIN_IMAGE_SCALE, SCALE_STEP } from './constants.js';
import { extractNumbers } from '../util.js';

const formImageUpload = document.querySelector('.img-upload__form');
const editableImage = formImageUpload.querySelector('.img-upload__preview img');
const controlSmaller = formImageUpload.querySelector('.scale__control--smaller');
const controlBigger = formImageUpload.querySelector('.scale__control--bigger');
const scaleControl = formImageUpload.querySelector('.scale__control--value');
let scaleValue = extractNumbers(scaleControl.value);

const resetImageScale = () => {
  scaleValue = DEFAULT_IMAGE_SCALE;
  editableImage.style.transform = `scale(${scaleValue / 100})`;
  scaleControl.value = `${scaleValue}%`;
};

const onControlSmallerClick = () => {
  if (scaleValue > MIN_IMAGE_SCALE) {
    scaleValue -= SCALE_STEP;
    editableImage.style.transform = `scale(${scaleValue / 100})`;
    scaleControl.value = `${scaleValue}%`;
  }
};

const onControlBiggerClick = () => {
  if (scaleValue < MAX_IMAGE_SCALE) {
    scaleValue += SCALE_STEP;
    editableImage.style.transform = `scale(${scaleValue / 100})`;
    scaleControl.value = `${scaleValue}%`;
  }
};

controlSmaller.addEventListener('click', onControlSmallerClick);
controlBigger.addEventListener('click', onControlBiggerClick);

export { resetImageScale };
