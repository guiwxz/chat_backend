import express from 'express';

import MessagesController from './controllers/MessagesController.js';
import ToWatchController from './controllers/ToWatchController.js';
import UsersController from './controllers/UsersController.js';
import WatchingController from './controllers/WatchingController.js';

const routes = express.Router();

routes.get('/messages', MessagesController.index);
routes.post('/messages', MessagesController.store);

routes.get('/login', UsersController.index);
routes.get('/users/:id', UsersController.show);

routes.get('/animeswatching', WatchingController.show);
routes.post('/animeswatching', WatchingController.store);
routes.delete('/animeswatching/:id', WatchingController.destroy);
routes.put('/animeswatching/:id', WatchingController.update);

routes.get('/animestowatch', ToWatchController.show);
routes.post('/animestowatch', ToWatchController.store);
routes.delete('/animestowatch/:id', ToWatchController.destroy);
routes.put('/animestowatch/:id', ToWatchController.update);

export default routes;