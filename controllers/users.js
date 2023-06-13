const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const { AUTH_SECRET } = require('../config');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201).send({
      data: {
        email: user.email, name: user.name
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Невалидные данные');
        next(error);
        return;
      }
      if (err.code === 11000) {
        const error = new ConflictError('Пользователь с таким email уже существует');
        next(error);
        return;
      }

      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, AUTH_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
