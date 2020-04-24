const { isParamEmpty } = require('simple-object-handler');
const { specialCharactersRegex, removeMoreThanOneSpaceBetweenWordsRegex } = require('../utils/regex-utils');

const normalize = (value = null) => {
  if (!isParamEmpty(value)) {
    return value
      .replace(specialCharactersRegex, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\uFFFD/g, '')
      .replace(removeMoreThanOneSpaceBetweenWordsRegex, ' ')
      .trim();
  }
  return null;
};

module.exports = {
  normalize,
};
