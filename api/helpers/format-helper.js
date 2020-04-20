const { isParamEmpty } = require('simple-object-handler');
const { specialCharactersRegex, removeMoreThanOneSpaceBetweenWordsRegex } = require('../utils/regex-utils');

const normalize = (value = null) => {
  if (!isParamEmpty(value)) {
    console.log('[params]', value);
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

const formatCpf = (cpf) => {
  if (!isParamEmpty(cpf)) {
    return normalize(cpf)
  }
};

module.exports = {
  normalize,
  formatCpf,
};
