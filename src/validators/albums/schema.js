import Joi from 'joi';

export const bodyAlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().required(),
});
