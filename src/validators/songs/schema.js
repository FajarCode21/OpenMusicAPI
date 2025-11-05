import joi from 'joi';

export const bodySongSchema = joi.object({
  title: joi.string().required(),
  year: joi.number().integer().required(),
  genre: joi.string().required(),
  performer: joi.string().required(),
  duration: joi.number().integer().optional(),
  albumId: joi.string().optional(),
});

export const querySongSchema = joi.object({
  title: joi.string().allow('').optional(),
  performer: joi.string().allow('').optional(),
});
