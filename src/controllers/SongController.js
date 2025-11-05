class SongController {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongController = this.postSongController.bind(this);
    this.getAllSongsController = this.getAllSongsController.bind(this);
    this.getSongByIdController = this.getSongByIdController.bind(this);
    this.putSongByIdController = this.putSongByIdController.bind(this);
    this.deleteSongByIdController = this.deleteSongByIdController.bind(this);
  }

  async postSongController(req, res, next) {
    try {
      this._validator.validateSongBody(req.body);
      const songId = await this._service.addSong(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          songId,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllSongsController(req, res, next) {
    try {
      this._validator.validateSongQuery(req.query);
      const songs = await this._service.getSong(req.query);
      res.status(200).json({
        status: 'success',
        data: {
          songs,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getSongByIdController(req, res, next) {
    try {
      const { id } = req.params;
      const song = await this._service.getSongById(id);
      res.status(200).json({
        status: 'success',
        data: {
          song,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async putSongByIdController(req, res, next) {
    try {
      this._validator.validateSongBody(req.body);
      const { id } = req.params;
      await this._service.editSongById(id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Lagu berhasil diperbarui',
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteSongByIdController(req, res, next) {
    try {
      const { id } = req.params;
      await this._service.deleteSongById(id);
      res.status(200).json({
        status: 'success',
        message: 'Lagu berhasil dihapus',
      });
    } catch (err) {
      next(err);
    }
  }
}

export default SongController;
