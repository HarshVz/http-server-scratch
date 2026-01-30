import { createServer, Server } from 'node:net';
import HttpResponse from './http-response.js';

class HttpServer {
  ip: string;
  port: number;
  server: Server;

  constructor({ ip, port }: { ip: string; port: number }) {
    this.ip = ip;
    this.port = port;
    this.server = createServer((socket) => {
      console.log(`connected ${socket}`);
      let response = '';

      socket.on('data', (data) => {
        const req = data.toString();
        const [rawHeaders, body = ''] = req.split('\r\n\r\n');
        const arr = rawHeaders.split('\r\n');

        const [method, path, versionRaw] = arr[0].split(' ');
        const version = versionRaw.replace('HTTP/', '');

        // Parse headers
        let headers: Record<string, string> = {};
        for (let i = 1; i < arr.length; i++) {
          if (!arr[i]) break; // empty line indicates end of headers
          const [key, value] = arr[i].split(': ');
          headers[key] = value;
        }

        if (method === 'GET') {
          console.log(
            method,
            path,
            version,
            headers['Host'],
            headers['Connection']
          );
          const response = new HttpResponse({ version }).getData(
            `${path}.html`
          );
          socket.end(response); // write + close
        }

        if (method === 'POST') {
          console.log(
            method,
            path,
            version,
            headers['Host'],
            headers['Connection']
          );
          const response = new HttpResponse({ version }).putData(
            `${path}.html`,
            body
          );
          socket.end(response);
        }
      });

      socket.on('close', () => {
        socket.end(response);
      });
    });
  }

  listen() {
    this.server.listen(this.port, this.ip, () => {
      console.log(`Server running on ${this.ip}:${this.port}`);
    });
  }
}

export default HttpServer;
