import { HttpRequestType } from '../types/HttpRequestTypes.js';
class HttpRequest {
  method: string;
  route: string;
  version: string;
  host: string;
  body?: object;
  connection: string;
  headers: Record<string, string>;

  constructor({
    method = 'GET',
    route = '/',
    version = '1.1',
    host = '127.0.0.1',
    body,
    connection = 'close',
    headers = {},
  }: HttpRequestType) {
    this.method = method;
    this.route = route;
    this.version = version;
    this.host = host;
    this.body = body;
    this.connection = connection;
    this.headers = headers;
  }

  private buildBody(): string {
    if (this.method === 'GET' || this.method === 'DELETE') {
      return '';
    }
    if (!this.body) return '';
    const bodyString = JSON.stringify(this.body);
    this.headers['Content-Type'] ??= 'application/json';
    this.headers['Content-Length'] = Buffer.byteLength(bodyString).toString();
    return bodyString;
  }

  private buildHeaders(): string {
    let headerString = `Host: ${this.host}\r\n`;
    headerString += `Connection: ${this.connection}\r\n`;

    for (const [key, value] of Object.entries(this.headers)) {
      headerString += `${key}: ${value}\r\n`;
    }
    return headerString;
  }

  toString(): string {
    const startLine = `${this.method} ${this.route} HTTP/${this.version}\r\n`;
    const body = this.buildBody();
    const headers = this.buildHeaders();

    return (
      startLine +
      headers +
      `\r\n` + // end of headers
      body
    );
  }
}

export default HttpRequest;
