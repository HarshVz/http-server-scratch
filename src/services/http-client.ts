import { Socket } from 'net';
import HttpRequest from './http-request';

class HttpClient {
  host: string;
  port: number;

  constructor(host: string, port: number) {
    this.host = host || '127.0.0.1';
    this.port = port || 3000;
  }

  send(req: HttpRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = new Socket();
      let response = '';

      client.connect(this.port, this.host, () => {
        client.write(req.toString());
      });

      client.on('data', (chunk) => {
        response += chunk.toString();
      });

      client.on('end', () => {
        resolve(response);
      });

      client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export default HttpClient;
