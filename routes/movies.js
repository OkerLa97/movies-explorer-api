const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMyMovies, createMove, deleteMovie,
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
    country: Joi.string().required().min(2).max(100),
    director: Joi.string().required().min(2).max(100),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(10000),
    image: Joi.string().required()
      .regex(URL_VALIDATION_REGEX),
    trailerLink: Joi.string().required()
      .regex(URL_VALIDATION_REGEX),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    thumbnail: Joi.string().required()
      .regex(URL_VALIDATION_REGEX),
    movieId: Joi.number().required(),
    duration: Joi.number().required(),
  }),
}), createMove);

// deleteMovie
router.delete('/:_id', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
