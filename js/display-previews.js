import {createPhotos} from './create-photos.js';
import {getTemplateElement} from './util.js';

const photos = createPhotos();
const previewList = document.querySelector('.pictures');
const previewTemplate = getTemplateElement('picture', 'picture');


const renderPreviewList = () => {
  const previewListFragment = document.createDocumentFragment();

  photos.forEach(({id, url, description, likes, comments}) => {
    const preview = previewTemplate.cloneNode(true);
    const previewImage = preview.querySelector('.picture__img');

    preview.dataset.id = id;
    previewImage.src = url;
    previewImage.alt = description;
    preview.querySelector('.picture__likes').textContent = likes;
    preview.querySelector('.picture__comments').textContent = comments.length;

    previewListFragment.append(preview);
  });

  previewList.append(previewListFragment);
};
renderPreviewList();

export {renderPreviewList};
