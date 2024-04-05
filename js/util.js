const getRandomInteger = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getTemplateElement = (templateId, elementClass) => document.querySelector(`#${templateId}`).content.querySelector(`.${elementClass}`);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isUniqueArray = (array) => {
  const set = new Set(array);
  return array.length === set.size;
};

const extractNumbers = (string) => {
  let result = '';
  string = string.toString();

  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    result += !isNaN(number) ? number : '';
  }

  return parseInt(result, 10);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, getTemplateElement, isEscapeKey, isUniqueArray, extractNumbers, debounce };
