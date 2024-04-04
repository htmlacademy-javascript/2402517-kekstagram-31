import { renderPreviewList } from './display-previews.js';
import './display-full-image.js';
import './display-upload-form.js';
import './validate-upload-form.js';
import './edit-scale-upload-image.js';
import './edit-effects-upload-image.js';
import { getData } from './api.js';
import { copyPhotosArray, savePhotos } from './photo-state.js';
import { showError } from './display-alert.js';

let photos;

getData()
  .then((newPhotos) => {
    savePhotos(newPhotos);
    photos = copyPhotosArray();
    renderPreviewList(photos);
  })
  .catch((err) => {
    showError(err);
  });


