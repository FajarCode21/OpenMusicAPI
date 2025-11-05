import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import InvariantError from '../exceptions/invariantError.js';
import NotFoundError from '../exceptions/notFoundError.js';

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan album');
    }
    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query1 = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const result1 = await this._pool.query(query1);
    if (!result1.rows.length) {
      throw new NotFoundError('Gagal mendapatkan album. Id tidak ditemukan');
    }

    const query2 = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [id],
    };
    const result2 = await this._pool.query(query2);
    return {
      ...result1.rows[0],
      songs: result2.rows,
    };
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
    return;
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus album. Id tidak ditemukan');
    }
    return;
  }
}

export default AlbumService;
