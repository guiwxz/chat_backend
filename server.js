import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import routes from './src/routes.js';
import connection from './src/socket/index.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["app-header"],
    credentials: true,
  }
});


connection(io);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
//server.listen(8080, () => console.log(`Listening on port 8080`));