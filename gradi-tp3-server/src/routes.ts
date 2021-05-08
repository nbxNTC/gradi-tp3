import { Router }  from 'express';
import SongController from './controllers/SongController';

import multer from 'multer';
import UploadConfig from './upload';

const routes = Router();
const upload = multer(UploadConfig);

routes.post('/songs', upload.array('song'), SongController.create);

routes.get('/songs', SongController.index);

export default routes;