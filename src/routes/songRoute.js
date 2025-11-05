import express from 'express';
import SongService from '../services/SongService.js';
import SongController from '../controllers/SongController.js';
import { songValidator } from '../validators/songs/index.js';

const Router = express.Router();
const songService = new SongService();
const songController = new SongController(songService, songValidator);

Router.post('/songs', songController.postSongController);
Router.get('/songs', songController.getAllSongsController);
Router.get('/songs/:id', songController.getSongByIdController);
Router.put('/songs/:id', songController.putSongByIdController);
Router.delete('/songs/:id', songController.deleteSongByIdController);

export default Router;
