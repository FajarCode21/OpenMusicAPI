import express from 'express';
import AlbumService from '../services/AlbumService.js';
import AlbumController from '../controllers/AlbumController.js';
import { albumValidator } from '../validators/albums/index.js';

const albumService = new AlbumService();
const albumController = new AlbumController(albumService, albumValidator);
const Router = express.Router();

Router.post('/albums', albumController.postAlbumController);
Router.get('/albums/:id', albumController.getAlbumByIdController);
Router.put('/albums/:id', albumController.putAlbumByIdController);
Router.delete('/albums/:id', albumController.deleteAlbumByIdController);

export default Router;
