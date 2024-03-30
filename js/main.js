import { renderPreviewList } from './display-previews.js';
import './display-full-image.js';
import './display-upload-form.js';
import './validate-upload-form.js';
import './edit-scale-upload-image.js';
import './edit-effects-upload-image.js';
import { getData } from './api.js';
import { savePhotos } from './photo-state.js';
import { showError } from './display-alert.js';

getData()
  .then((photos) => {
    renderPreviewList(photos);
    savePhotos(photos);
  })
  .catch((err) => {
    showError(err);
  });
