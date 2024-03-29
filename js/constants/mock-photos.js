import { createPhotos } from '../create-mock-photos.js';

const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MAX_DESCRIPTION_SENTENCES = 3;
const PHOTO_DESCRIPTIONS = [
  'Фотография обладает гармонией контрастов: игра света и тени создает уникальную эмоциональную глубину.',
  'Захваченный момент уникальной симметрии: композиция из линий и форм создает впечатляющую визуальную абстракцию.',
  'Эта фотография запечатлела движение во времени: размытые контуры создают ощущение динамики и энергии.',
  'На снимке изображена игра света и цвета, словно пленительный танец, в котором каждый оттенок раскрывает свою уникальную роль.',
  'Фото переносит зрителя в иной мир: абстрактные формы и текстуры позволяют каждому найти свое собственное значение.',
  'Снимок представляет собой симфонию природы: каждый элемент композиции играет свою неповторимую мелодию, создавая гармонию и баланс.',
  'Фотография окутана тайной и загадкой: непредсказуемые контуры и структуры придают ей мистическое очарование.',
  'Этот снимок открывает двери в мир абстракции: кажущиеся случайными фрагменты складываются в гармоничное целое, вызывая воображение.',
  'На фотографии запечатлены моменты эмоций: формы и цвета становятся языком, говорящим на уровне чувств.',
  'Фото раскрывает бесконечные возможности перспективы: глубина поля зрения придает ему ощущение бесконечности и величия.',
  'Снимок отражает хрупкую красоту момента: мимолетные отражения и оттенки создают уникальный эстетический опыт.',
  'Эта фотография исследует границы реальности: искаженные формы и перспективы открывают новые пути в воображении.',
  'Фото словно играет с чувствами зрителя: абстрактные структуры и фрагменты вызывают широкий спектр эмоций и ассоциаций.',
  'На снимке запечатлены фрагменты момента: каждая деталь становится частью большого пазла, раскрывая историю и смысл.',
  'Фотография словно лепесток ветра: легкие движения и тонкие оттенки создают впечатление летящей красоты, ускользающей от взгляда.'
];
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const USER_NAMES = [
  'Элизабет',
  'Джейкоб',
  'София',
  'Ноа',
  'Эмма',
  'Лиам',
  'Оливия',
  'Уильям',
  'Ава',
  'Джеймс',
  'Изабелла',
  'Александр',
  'Миа',
  'Майкл',
  'Шарлотта'
];

const MOCK_PHOTOS = createPhotos();

export { USER_NAMES, COMMENT_MESSAGES, PHOTO_DESCRIPTIONS, MAX_DESCRIPTION_SENTENCES, MAX_COMMENTS, MAX_LIKES, MIN_LIKES, PHOTOS_COUNT, MOCK_PHOTOS };
