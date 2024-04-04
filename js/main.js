import { renderPreviewList } from './display-previews.js';
import './display-full-image.js';
import './display-upload-form.js';
import './validate-upload-form.js';
import './edit-scale-upload-image.js';
import './edit-effects-upload-image.js';
import { getData } from './api.js';
import { savePhotos } from './photo-state.js';
import { showError } from './display-alert.js';
import { addFilters } from './filter-previews.js';

getData()
  .then((newPhotos) => {
    savePhotos(newPhotos);
    renderPreviewList(newPhotos);
  })
  .then(() => {
    addFilters();
  })
  .catch((err) => {
    showError(err);
  });
