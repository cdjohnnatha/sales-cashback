const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const concat = require('concat-files');
const logger = require('./api/config/logger');

const swaggerFilesPath = '/docs/';
const swaggerModelFilesPath = '/docs/models/';
const swaggerJsonFile = './public/swagger.json';

function readSwaggerFilesFromFolder(folderPath) {
  try {
    // const swaggerJson = fs.createWriteStream(path.join(__dirname, './', '/public/swagger.json'));
    let files = fs
      .readdirSync(path.join(__dirname, './', folderPath))
      .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === '.yml'));
    files = files.map(file => path.join(__dirname, './', `${folderPath}${file}`));
    return files;
  } catch (error) {
    logger.systemLogLevel(error);
  }
  return null;
}

gulp.task('swagger', async () => {
  try {
    // const swaggerJson = fs.createWriteStream(path.join(__dirname, './', '/public/swagger.json'));
    let files = readSwaggerFilesFromFolder(swaggerFilesPath);
    files = files.concat(readSwaggerFilesFromFolder(swaggerModelFilesPath));
    logger.info(files);
    concat(files, swaggerJsonFile);
    // concat(models, swaggerJsonFile);
  } catch (error) {
    logger.systemLogLevel(error);
  }
});