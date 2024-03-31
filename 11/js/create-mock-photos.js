import { getRandomInteger } from './util.js';
import * as constant from './constants/mock-photos.js';

const generatePhotoDescription = (maxSentences) => {
  const sentencesCount = getRandomInteger(1, maxSentences);
  const photoDescriptionIndexes = [];

  for (let i = 0; i < sentencesCount; i++) {
    const randomDescriptionIndex = getRandomInteger(0, constant.PHOTO_DESCRIPTIONS.length - 1);

    if (!photoDescriptionIndexes.includes(randomDescriptionIndex)) {
      photoDescriptionIndexes.push(randomDescriptionIndex);
    } else {
      i--;
    }
  }

  return photoDescriptionIndexes.map((index) => constant.PHOTO_DESCRIPTIONS[index]).join(' ');
};

let commentId = 1;
const createComment = () => {
  const comment = {};
  comment.id = commentId;
  comment.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
  comment.message = constant.COMMENT_MESSAGES[getRandomInteger(0, constant.COMMENT_MESSAGES.length - 1)];
  comment.name = constant.USER_NAMES[getRandomInteger(0, constant.USER_NAMES.length - 1)];
  commentId++;

  return comment;
};

const createPhoto = () => {
  let lastId = 1;

  return () => {
    const photo = {};
    photo.id = lastId;
    photo.url = `photos/${lastId}.jpg`;
    photo.description = generatePhotoDescription(constant.MAX_DESCRIPTION_SENTENCES);
    photo.likes = getRandomInteger(constant.MIN_LIKES, constant.MAX_LIKES);
    photo.comments = Array.from({length: getRandomInteger(0, constant.MAX_COMMENTS)}, createComment);
    lastId++;
    return photo;
  };
};

const createPhotos = () => Array.from({length: constant.PHOTOS_COUNT}, createPhoto());

export { createPhotos };
