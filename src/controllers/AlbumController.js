class AlbumController {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumController = this.postAlbumController.bind(this);
    this.getAlbumByIdController = this.getAlbumByIdController.bind(this);
    this.putAlbumByIdController = this.putAlbumByIdController.bind(this);
    this.deleteAlbumByIdController = this.deleteAlbumByIdController.bind(this);
  }

  async postAlbumController(req, res, next) {
    try {
      this._validator.validateAlbumBody(req.body);
      const albumId = await this._service.addAlbum(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          albumId,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAlbumByIdController(req, res, next) {
    try {
      const { id } = req.params;
      const album = await this._service.getAlbumById(id);
      res.status(200).json({
        status: 'success',
        data: {
          album,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async putAlbumByIdController(req, res, next) {
    try {
      this._validator.validateAlbumBody(req.body);
      const { id } = req.params;
      await this._service.editAlbumById(id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Album berhasil diperbarui',
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteAlbumByIdController(req, res, next) {
    try {
      const { id } = req.params;
      await this._service.deleteAlbumById(id);
      res.status(200).json({
        status: 'success',
        message: 'Album berhasil dihapus',
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AlbumController;
