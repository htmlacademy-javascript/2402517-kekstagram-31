import { getRandomInteger, debounce } from './util.js';
import { renderPreviewList, cleanPreviewList } from './display-previews.js';
import { copyPhotosArray } from './photo-state.js';

const RANDOM_PHOTOS_FILTER_ID = 'filter-random';
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_COUNT = 10;
const APPLY_FILTERS_DELAY = 500;
const filters = document.querySelector('.img-filters');

const showFilters = () => filters.classList.remove('img-filters--inactive');

const getUniqueRandomPhotos = (photos, randomPhotosCount) => {
  if (photos.length > randomPhotosCount) {
    const uniqueRandomPhotoIndexes = [];

    for (let i = 0; i < randomPhotosCount; i++) {
      const randomPhotoIndex = getRandomInteger(0, photos.length - 1);

      if (!uniqueRandomPhotoIndexes.includes(randomPhotoIndex)) {
        uniqueRandomPhotoIndexes.push(randomPhotoIndex);
      } else {
        i--;
      }
    }

    return uniqueRandomPhotoIndexes.map((index) => photos[index]);
  }
};

let sortedPhotos = [];
const getSortedDiscussedPhotos = (photos) => {
  if (!(sortedPhotos.length === photos.length)) {
    sortedPhotos = photos.toSorted((a, b) => b.comments.length - a.comments.length);
  }

  return sortedPhotos;
};

const swichFilter = (filteredPreviews) => {
  cleanPreviewList();
  renderPreviewList(filteredPreviews);
};

const applyFilters = debounce(swichFilter, APPLY_FILTERS_DELAY);

const FilterActions = {
  'filter-default': (photos) => applyFilters(photos),
  'filter-random': (photos) => applyFilters(getUniqueRandomPhotos(photos, RANDOM_PHOTOS_COUNT)),
  'filter-discussed': (photos) => applyFilters(getSortedDiscussedPhotos(photos))
};

const addFilters = () => {
  showFilters();
  const photosDublicate = copyPhotosArray();

  const onFilterClick = (evt) => {
    if (!evt.target.matches('button.img-filters__button')) {
      return;
    }

    const activeFilterButton = filters.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
    const currentFilterButton = evt.target;

    if (currentFilterButton.id === activeFilterButton.id && !(activeFilterButton.id === RANDOM_PHOTOS_FILTER_ID)) {
      return;
    }

    if (!currentFilterButton.classList.contains(ACTIVE_BUTTON_CLASS)) {
      currentFilterButton.classList.add(ACTIVE_BUTTON_CLASS);
      activeFilterButton.classList.remove(ACTIVE_BUTTON_CLASS);
    }

    FilterActions[`${currentFilterButton.id}`](photosDublicate);
  };

  filters.addEventListener('click', onFilterClick);
};

export { addFilters };
