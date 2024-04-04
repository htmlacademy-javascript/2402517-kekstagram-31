import { getRandomInteger } from './util.js';
import { renderPreviewList, cleanPreviewList } from './display-previews.js';
import { copyPhotosArray } from './photo-state.js';

const RANDOM_FILTER_ID = 'filter-random';
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_COUNT = 10;
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
const getSortiedDiscussedPhotos = (photos) => {
  if (!(sortedPhotos.length === photos.length)) {
    sortedPhotos = photos.toSorted((a, b) => b.comments.length - a.comments.length);
  }

  return sortedPhotos;
};

const addFilters = () => {
  showFilters();
  const photosDublicate = copyPhotosArray();

  const FilterActions = {
    'filter-default': () => {
      renderPreviewList(photosDublicate);
    },
    'filter-random': () => {
      renderPreviewList(getUniqueRandomPhotos(photosDublicate, RANDOM_PHOTOS_COUNT));
    },
    'filter-discussed': () => {
      renderPreviewList(getSortiedDiscussedPhotos(photosDublicate));
    }
  };

  const onFilterClick = (evt) => {
    if (evt.target.matches('button.img-filters__button')) {
      const activeFilterButton = filters.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
      const currentFilterButton = evt.target;

      if (currentFilterButton.id === activeFilterButton.id && !(activeFilterButton.id === RANDOM_FILTER_ID)) {
        return;
      }

      if (!currentFilterButton.classList.contains(ACTIVE_BUTTON_CLASS)) {
        currentFilterButton.classList.add(ACTIVE_BUTTON_CLASS);
        activeFilterButton.classList.remove(ACTIVE_BUTTON_CLASS);
      }

      cleanPreviewList();
      FilterActions[`${currentFilterButton.id}`]();
    }
  };

  if (!filters.classList.contains('.img-filters--inactive')) {
    filters.addEventListener('click', onFilterClick);
  }
};

export { addFilters };
