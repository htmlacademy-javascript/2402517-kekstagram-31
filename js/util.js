const getRandomInteger = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getTemplateElement = (templateId, elementClass) => document.querySelector(`#${templateId}`).content.querySelector(`.${elementClass}`);

const isEscapeKey = (evt) => evt.key === 'Escape';

const checkLength = (string = '', maxLength = 1) => string.length <= maxLength;
checkLength('1', 1); // Вызов для линтера

const checkPalindrome = (string) => {
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }

  return string.toLowerCase().replaceAll(' ', '') === reverseString.toLowerCase().replaceAll(' ', '');
};
checkPalindrome('Лёша на полке клопа нашёл '); // Вызов для линтера

const extractNumbers = (string) => {
  let result = '';
  string = string.toString();

  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    result += !isNaN(number) ? number : '';
  }

  return parseInt(result, 10);
};
extractNumbers(-1.5); // Вызов для линтера

export {getRandomInteger, getTemplateElement, isEscapeKey};
