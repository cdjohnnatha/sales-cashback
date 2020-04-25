const {
  format,
  transports,
  createLogger,
  config,
} = require('winston');
const Bottleneck = require('bottleneck');

const { timestamp, combine, json, colorize, label, errors } = format;

const isDevelopmentEnviroment = process.env.NODE_ENV === 'dev';
const { LOG_LEVEL } = process.env;
const sysLogKeys = [
  'emerg',
  'alert',
  'crit',
  'error',
  'warning',
  'notice',
  'info',
  'verbose',
  'debug',
];

const consoleTransport = new transports.Console({
  format: combine(
    label({ attributes: {} }),
    colorize({ all: true }),
    errors({ stack: true }),
    timestamp()
  ),
});

const bottleneck = new Bottleneck.default({
  maxConcurrent: 1,
  minTime: LOG_LEVEL === 'debug' ? 5000 : 3000,
});

const logger = createLogger({
  level: LOG_LEVEL || 'debug',
  levels: config.syslog.levels,
  exitOnError: false,
  format: combine(label({ attributes: {} }), json(), timestamp()),
  transports: consoleTransport,
  exceptionHandlers: consoleTransport,
  silent: false,
});

if (isDevelopmentEnviroment) {
  logger.add(new transports.File({ filename: 'logs/error.log', level: 'error' }));
  logger.add(new transports.File({ filename: 'logs/combined.log' }));
}

/**
 * @function logger.systemLogLevel
 * @param {Object} param
 * @param {type} param.activity_type - type of system activity.
 * @param {type} param.meta - Any extra information related with.
 * @param {type} param.level - Level log, it will be considered debug as default.
 */
logger.systemLogLevel = async ({ error = null, meta = {}, level = 'debug', message = null }, context) => {
  try {
    if (!sysLogKeys.includes(level)) {
      throw new Error('Log level not found');
    }

    meta.error = error;
    if (error && !message) {
      message = error.message;
    }

    if (process.env.LOGGER_ON_TESTS) {
      bottleneck.schedule({}, () =>
        Promise.resolve().then(() => {
          logger[level]({
            message,
            meta,
          });
        })
      );
    }
  } catch (error) {
    bottleneck.schedule({}, () =>
      Promise.resolve().then(() => {
        logger.customError({
          error,
          meta: {
            function: 'logger.systemDebug',
          }
        });
      })
    );
  }
};

module.exports = logger;