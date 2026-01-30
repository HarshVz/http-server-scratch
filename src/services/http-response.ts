import * as fs from 'node:fs';
import * as path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HttpResponse {
  version: string;
  statusCode: number;
  status?: string;
  content_type: string;
  content_length: number;
  body: string;
  basePath: string;

  private setStatus = () => {
    if (this.statusCode < 300) this.status = 'OK';
    else if (this.statusCode < 400) this.status = 'WARN';
    else if (this.statusCode < 500) this.status = 'ERROR';
    else this.status = 'SERVER_CRASH';
  };

  private prepareResponse = (): string => {
    let response = '';
    this.content_length = Buffer.byteLength(this.body, 'utf-8');
    this.setStatus();
    response += `HTTP/${this.version} ${this.statusCode} ${this.status}\r\n`;
    response += `X-Powered-By: @HARSHVZ\r\n`;
    response += `Content-Type: ${this.content_type}\r\n`;
    response += `Content-Length: ${this.content_length}\r\n`;
    response += `Date: ${new Date().toUTCString()}\r\n`;
    response += `Connection: close\r\n`;
    response += `\r\n`;
    response += this.body;
    return response;
  };

  constructor({
    version = '1.1',
    statusCode = 400,
    content_type = 'plain/text',
  }: {
    version?: string;
    statusCode?: number;
    content_type?: string;
  }) {
    this.version = version;
    this.statusCode = statusCode;
    this.content_type = content_type;
    this.setStatus();
    this.body = '';
    this.content_length = this.body.length;
    this.basePath = path.join(__dirname, '..', '..', 'public');
  }

  getData(res: string) {
    let filePath = path.join(this.basePath, `${res}`);
    console.log(filePath);

    if (fs.existsSync(filePath)) {
      this.content_type = 'text/html; charset=utf-8';
      this.statusCode = 200;
      this.body = fs.readFileSync(filePath, 'utf-8'); // returns a string
    } else {
      this.body = 'not found';
      this.statusCode = 404;
      this.content_type = 'plain/text';
    }
    return this.prepareResponse();
  }

  putData(res: string, content: string) {
    const safeRes = path.basename(res);
    const filePath = path.join(this.basePath, safeRes);

    const existed = fs.existsSync(filePath);

    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      this.statusCode = existed ? 200 : 201;
      return this.getData(safeRes);
    } catch {
      this.statusCode = 500;
      this.content_type = 'text/plain';
      this.body = 'Failed to write file';
      return this.prepareResponse();
    }
  }

  json({ body = {}, statusCode = 400 }: { body: object; statusCode: number }) {
    this.statusCode = statusCode;
    this.setStatus();
    this.body = JSON.stringify(body);
    this.content_type = 'application/json';
    return this.prepareResponse();
  }

  text({ body = '', statusCode = 400 }: { body: string; statusCode: number }) {
    this.statusCode = statusCode;
    this.setStatus();
    this.body = body;
    this.content_type = 'plain/text';
    return this.prepareResponse();
  }
}

export default HttpResponse;
