type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export interface HttpRequestType {
  method?: HttpMethod;
  route?: string;
  version?: string;
  host?: string;
  body?: object;
  connection?: string;
  headers?: Record<string, string>;
}
