import './view-images/display-full-image.js';
import './upload-form/display-upload-form.js';
import { getData } from './data/api.js';
import { savePhotos } from './data/photo-state.js';
import { renderPreviewList } from './view-images/display-previews.js';
import { addFilters } from './view-images/filter-previews.js';
import { showError } from './upload-form/display-alert.js';

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
