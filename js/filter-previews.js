import { getRandomInteger } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const filters = document.querySelector('.img-filters');

const showFilters = () => filters.classList.remove('img-filters--inactive');

const getUniqueRandomPhotos = (photos, photosCount) => {
  const uniqueRandomPhotoIndexes = [];

  for (let i = 0; i < photosCount; i++) {
    const randomPhotoIndex = getRandomInteger(0, photos.length - 1);

    if (!uniqueRandomPhotoIndexes.includes(randomPhotoIndex)) {
      uniqueRandomPhotoIndexes.push(randomPhotoIndex);
    } else {
      i--;
    }
  }

  return uniqueRandomPhotoIndexes.map((index) => photos[index]);
};

const getSortiedDiscussedPhotos = (photos) => photos.toSorted((a, b) => b.comments.length - a.comments.length);

export { showFilters, getUniqueRandomPhotos, RANDOM_PHOTOS_COUNT, getSortiedDiscussedPhotos };
