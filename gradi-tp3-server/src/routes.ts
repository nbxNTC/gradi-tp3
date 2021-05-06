import { Router }  from 'express';
import SongController from './controllers/SongController';

const routes = Router();

routes.post('/songs', SongController.create);

routes.get('/songs', SongController.index);

export default routes;