import { bodySongSchema, querySongSchema } from './schema.js';
import InvariantError from '../../exceptions/invariantError.js';

export const songValidator = {
  validateSongBody: (reqBody) => {
    const { error } = bodySongSchema.validate(reqBody);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateSongQuery: (reqQuery) => {
    const { error } = querySongSchema.validate(reqQuery);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
