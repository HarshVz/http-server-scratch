import HttpServer from './services/http-server.js';

const httpServer = new HttpServer({
  ip: '127.0.0.1',
  port: 3005,
});
httpServer.listen();
