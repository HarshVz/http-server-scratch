import { Socket } from 'node:net';
import HttpClient from './services/http-client.js';
import HttpRequest from './services/http-request.js';

const HOST = '127.0.0.1';
const PORT = 3005;

const client = new HttpClient(HOST, PORT);
client
  .send(
    new HttpRequest({
      method: 'GET',
      route: '/example',
      version: '1.1',
      host: HOST,
      connection: 'close',
    })
  )
  .then((res) => console.log(res));

// client.send(new HttpRequest({
//     method: "POST",
//     route: "/",
//     version: "1.1",
//     host: HOST,
//     connection: "close",
//     body: {
//         "msg": "post demo"
//     }
// })).then((res) => console.log(res));
