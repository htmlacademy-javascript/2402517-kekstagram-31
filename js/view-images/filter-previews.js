import { getRandomInteger, debounce } from '../util.js';
import { renderPreviewList, cleanPreviewList } from './display-previews.js';
import { copyPhotosArray } from '../data/photo-state.js';

const RANDOM_PHOTOS_FILTER_ID = 'filter-random';
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_COUNT = 10;
const APPLY_FILTERS_DELAY = 500;
const filters = document.querySelector('.img-filters');

const showFilters = () => filters.classList.remove('img-filters--inactive');

const getUniqueRandomPhotos = (photos, randomPhotosCount) => {
  if (photos.length <= randomPhotosCount) {
    return;
  }

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
};

let sortedPhotos = [];
const getSortedDiscussedPhotos = (photos) => {
  if (!(sortedPhotos.length === photos.length)) {
    sortedPhotos = photos.toSorted((photo1, photo2) => photo2.comments.length - photo1.comments.length);
  }

  return sortedPhotos;
};

const switchFilter = (filteredPreviews) => {
  cleanPreviewList();
  renderPreviewList(filteredPreviews);
};

const applyFilters = debounce(switchFilter, APPLY_FILTERS_DELAY);

const FilterActionById = {
  'filter-default': 'sortDefault',
  'filter-random': 'sortRandom',
  'filter-discussed': 'sortDiscussed'
};

const FilterActions = {
  sortDefault(photos) {
    applyFilters(photos);
  },

  sortRandom(photos) {
    applyFilters(getUniqueRandomPhotos(photos, RANDOM_PHOTOS_COUNT));
  },

  sortDiscussed(photos) {
    applyFilters(getSortedDiscussedPhotos(photos));
  }
};

const addFilters = () => {
  showFilters();
  const photosDuplicate = copyPhotosArray();

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

    const filterAction = FilterActionById[`${currentFilterButton.id}`];
    FilterActions[`${filterAction}`](photosDuplicate);
  };

  filters.addEventListener('click', onFilterClick);
};

export { addFilters };
