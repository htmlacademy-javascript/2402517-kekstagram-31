import {createPhotos} from './create-photos.js';
import {getTemplateElement} from './util.js';

const photos = createPhotos();
const previewList = document.querySelector('.pictures');
const previewTemplate = getTemplateElement('picture', 'picture');
const previewListFragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const preview = previewTemplate.cloneNode(true);
  preview.querySelector('.picture__img').src = url;
  preview.querySelector('.picture__img').alt = description;
  preview.querySelector('.picture__likes').textContent = likes;
  preview.querySelector('.picture__comments').textContent = comments.length;
  previewListFragment.append(preview);
});

previewList.append(previewListFragment);
