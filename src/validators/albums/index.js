import { bodyAlbumSchema } from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

export const albumValidator = {
  validateAlbumBody: (reqBody) => {
    const { error } = bodyAlbumSchema.validate(reqBody);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
