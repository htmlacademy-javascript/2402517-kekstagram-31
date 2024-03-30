import { isEscapeKey } from './util.js';
import { getPhotoById } from './photo-state.js';
import { SHOW_COMMENTS_STEP } from './constants/full-image.js';

const body = document.body;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const buttonLoadComments = bigPicture.querySelector('.comments-loader');
let renderedComments = [];
let commentShownCount = 0;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderCommentList = (commentsData) => commentsData.map((commentData) => {
  const comment = commentTemplate.cloneNode(true);
  const commentAvatar = comment.querySelector('img');

  commentAvatar.src = commentData.avatar;
  commentAvatar.alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;

  return comment;
});

const showComments = () => {
  const nextComments = renderedComments.slice(commentShownCount, commentShownCount + SHOW_COMMENTS_STEP);
  const nextCommentsFragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    nextCommentsFragment.append(comment);
    commentShownCount++;
  });
  commentList.append(nextCommentsFragment);

  if (commentShownCount >= renderedComments.length) {
    buttonLoadComments.classList.add('hidden');
  } else {
    buttonLoadComments.classList.remove('hidden');
  }

  bigPicture.querySelector('.social__comment-shown-count').textContent = commentShownCount;
};

function openBigPicture (evt) {
  const previewId = Number(evt.target.parentNode.dataset.id);
  const currentPhoto = getPhotoById(previewId);
  const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');

  commentList.innerHTML = ''; // удаляет комментарии к фото, написанные в разметке, и с предыдущего открытия
  bigPictureImage.src = currentPhoto.url;
  bigPictureImage.alt = 'Фотография пользователя';
  bigPicture.querySelector('.likes-count').textContent = currentPhoto.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = currentPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = currentPhoto.description;
  renderedComments = renderCommentList(currentPhoto.comments);
  showComments();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentShownCount = 0;

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onPreviewClick = (evt) => {
  if (evt.target.matches('img.picture__img')) {
    evt.preventDefault();
    openBigPicture(evt);
  }
};

picturesContainer.addEventListener('click', onPreviewClick);
bigPictureCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});
buttonLoadComments.addEventListener('click', showComments);
