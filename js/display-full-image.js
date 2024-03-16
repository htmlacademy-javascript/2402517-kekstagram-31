import {isEscapeKey} from './util.js';
import {photos} from './display-previews.js';

const body = document.body;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = bigPicture.querySelector('.social__comment');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderCommentList = (commentsData) => {
  const commentListFragment = document.createDocumentFragment();
  const commentList = bigPicture.querySelector('.social__comments');
  commentList.innerHTML = ''; // удаляет комментарии к фото, написанные в разметке, и с предыдущего открытия

  commentsData.forEach((commentData) => {
    const comment = commentTemplate.cloneNode(true);
    const commentAvatar = comment.querySelector('img');

    commentAvatar.src = commentData.avatar;
    commentAvatar.alt = commentData.name;
    comment.querySelector('.social__text').textContent = commentData.message;

    commentListFragment.append(comment);
  });

  commentList.append(commentListFragment);
};

function openBigPicture (evt) {
  const previewId = Number(evt.target.parentNode.dataset.id);
  const currentPhoto = photos.find((photo) => photo.id === previewId);
  const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const commentShownCount = currentPhoto.comments.length; // Временно так

  bigPictureImage.src = currentPhoto.url;
  bigPictureImage.alt = currentPhoto.description;
  bigPicture.querySelector('.likes-count').textContent = currentPhoto.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = commentShownCount;
  bigPicture.querySelector('.social__comment-total-count').textContent = currentPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = currentPhoto.description;
  renderCommentList(currentPhoto.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture (evt) {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onPreviewClick = (evt) => {
  if (evt.target.matches('img.picture__img')) {
    evt.preventDefault();
    openBigPicture(evt);
  }
};

picturesContainer.addEventListener('click', onPreviewClick);
bigPictureCancel.addEventListener('click', closeBigPicture);
