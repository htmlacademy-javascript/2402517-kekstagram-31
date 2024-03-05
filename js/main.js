const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const PHOTOS_DESCRIPTIONS = [
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

const getRandomInteger = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const generatePhotoDescription = (maxSentences) => {
  const sentencesCount = getRandomInteger(1, maxSentences);
  const photoDesctiptions = [];

  for (let i = 0; i < sentencesCount; i++) {
    const randomDescription = PHOTOS_DESCRIPTIONS[getRandomInteger(0, PHOTOS_DESCRIPTIONS.length - 1)];

    if (!photoDesctiptions.includes(randomDescription)) {
      photoDesctiptions.push(randomDescription);
    } else {
      i--;
    }
  }

  return photoDesctiptions.join(' ');
};

let commentId = 1;
const createComment = () => () => {
  const comment = {};
  comment.id = commentId;
  comment.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
  comment.message = COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)];
  comment.name = USER_NAMES[getRandomInteger(0, USER_NAMES.length - 1)];
  commentId++;

  return comment;
};

const createPhoto = () => {
  let lastId = 1;

  return () => {
    const photo = {};
    photo.id = lastId;
    photo.url = `photos/${lastId}.jpg`;
    photo.description = generatePhotoDescription(3);
    photo.likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
    photo.comments = Array.from({length: getRandomInteger(0, MAX_COMMENTS)}, createComment());
    lastId++;
    return photo;
  };
};

// const photos =
Array.from({length: PHOTOS_COUNT}, createPhoto());
