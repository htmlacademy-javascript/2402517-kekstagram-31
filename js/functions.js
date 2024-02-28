// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
// если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы.
const lengthCheck = (string, maxLength) => string.length <= maxLength;
lengthCheck('1', 1);

// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
const palindromeCheck = (string) => {
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }

  return string.toLowerCase().replaceAll(' ', '') === reverseString.toLowerCase().replaceAll(' ', '');
};
palindromeCheck('Лёша на полке клопа нашёл ');

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN
const extractNumbers = (string) => {
  let result = '';
  string = string.toString();

  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    result += !isNaN(number) ? number : '';
  }

  return parseInt(result, 10);
};
extractNumbers(-1.5);
