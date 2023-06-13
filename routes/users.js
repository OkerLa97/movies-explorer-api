const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

// getCurrentUser
router.get('/me', getCurrentUser);

// updateUser
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = router;
