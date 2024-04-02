let photosData = [];

const savePhotos = (newPhotos) => {
  photosData = newPhotos;
};

const getPhotoById = (id) => photosData.find((photo) => photo.id === id);

const copyPhotosArray = () => photosData.slice();

export { savePhotos, getPhotoById, copyPhotosArray };
