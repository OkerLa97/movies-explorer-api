const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.getMyMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMove = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    },
  ).then((movie) => {
    Movie.findById(movie._id)
      .populate(['owner'])
      .then((movieData) => {
        res.status(201).send({ data: movieData });
      })
      .catch(next);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      console.log(err);
      const error = new ValidationError('Ошибка валидации');
      next(error);
      return;
    }

    next(err);
  });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new ValidationError('Нет фильма с таким id');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ValidationError('Нельзя удалить чужой фильм');
      } else {
        res.send({ data: movie });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError('Нет фильма с таким id');
        next(error);
        return;
      }

      next(err);
    });
};
