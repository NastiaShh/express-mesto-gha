const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const ValidationError = require('../errors/ValidationError');

const validateLoginInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(40),
  }),
});

const validateProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((url) => {
      if (!isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
        throw new ValidationError('Некорректная ссылка');
      }
      return url;
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom((url) => {
      if (!isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
        throw new ValidationError('Некорректная ссылка');
      }
      return url;
    }),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  validateLoginInfo,
  validateProfileInfo,
  validateAvatar,
  validateUserId,
  validateCard,
  validateCardId,
};
