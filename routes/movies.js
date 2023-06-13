const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMyMovies, createMove,
} = require('../controllers/movies');
const { URL_VALIDATION_REGEX } = require('../config');

// getMovies
router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), getMyMovies);

// createMovie
router.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(10000),
    image: Joi.string().required()
      .regex(URL_VALIDATION_REGEX),
    trailer: Joi.string().required()
      .regex(URL_VALIDATION_REGEX),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    thumbnail: Joi.string().required()
      .regex(URL_VALIDATION_REGEX),
  }),
}), createMove);

module.exports = router;
