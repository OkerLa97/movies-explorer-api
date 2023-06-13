require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = {
  AUTH_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  URL_VALIDATION_REGEX: /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/,
};
