import express from 'express';

import MessagesController from './controllers/MessagesController.js';
import UsersController from './controllers/UsersController.js';

const routes = express.Router();

routes.get('/messages', MessagesController.index);
routes.post('/messages', MessagesController.store);

routes.get('/login', UsersController.index);
routes.get('/users/:id', UsersController.show);

export default routes;