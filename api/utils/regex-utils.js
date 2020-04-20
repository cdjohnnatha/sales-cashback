/**
 * @constant specialCharactersRegex
 * @description Is a regex used to verify if have any special characters in a string.
 */
const specialCharactersRegex = /[!@#\\¨$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

/**
 * @constant lettersRegex
 * @description It is used to check if it was types just letters.
 */
const lettersRegex = /^[a-zA-Z]+$/;

/**
 * @constant numberRegex
 * @description Regex which check if something is a sequency o numbers.
 */
const numberRegex = /^\d+$/;

/**
 * @constant removeMoreThanOneSpaceBetweenWordsRegex
 * @description It will remove when it has more than one space between words.
 */
const removeMoreThanOneSpaceBetweenWordsRegex = /\s\s+/g;


module.exports = {
  specialCharactersRegex,
  lettersRegex,
  numberRegex,
  removeMoreThanOneSpaceBetweenWordsRegex,
};
