import { isUniqueArray } from '../util.js';
import { MAX_HASHTAGS, MAX_HASHTAG_LENGTH, MAX_DESCRIPTION_LENGTH } from './constants-upload-form.js';

const formImageUpload = document.querySelector('.img-upload__form');
const hashtagsField = document.querySelector('.text__hashtags');
const hashtagTemplate = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH}}$`, 'i');

const pristine = new Pristine(formImageUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const splitHashtags = (value) => value.split(' ').filter((hashtag) => hashtag !== '');

const validateHashtagsCount = (value) => {
  const hashtags = splitHashtags(value);
  return hashtags.length <= MAX_HASHTAGS;
};

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  'превышено количество хэштегов'
);

const validateHashtagsUniqueness = (value) => {
  const hashtags = splitHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return isUniqueArray(hashtags);
};

pristine.addValidator(
  hashtagsField,
  validateHashtagsUniqueness,
  'хэштеги повторяются'
);

const validateHashtagsContent = (value) => {
  const hashtags = splitHashtags(value);
  return hashtags.every((hashtag) => hashtagTemplate.test(hashtag));
};

pristine.addValidator(
  hashtagsField,
  validateHashtagsContent,
  'введён невалидный хэштег'
);

pristine.addValidator(
  document.querySelector('.text__description'),
  (value) => value.length <= MAX_DESCRIPTION_LENGTH,
  `длина комментария больше ${MAX_DESCRIPTION_LENGTH} символов`
);

const isValidForm = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { isValidForm, resetValidation };
