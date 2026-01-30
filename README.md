# HTTP Server from Scratch

This project is a simple implementation of an HTTP server built from the ground up using Node.js and TypeScript. It is designed to handle basic HTTP `GET` and `POST` requests and serves static HTML files from the `public` directory.

## Features

- **Built with TypeScript**: The entire codebase is written in TypeScript, providing type safety and better developer experience.
- **Raw TCP Implementation**: The server is built on top of the `node:net` module, which provides a low-level interface for network communication.
- **GET and POST Request Handling**: The server can handle both `GET` and `POST` requests.
  - `GET` requests are used to retrieve and serve HTML files.
  - `POST` requests can be used to create or update files in the `public` directory.
- **Static File Serving**: The server can serve static `.html` files from the `public` directory.

## How to Use

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build and run the server**:
   ```bash
   npm run dev
   ```
   The server will start on `http://127.0.0.1:3005`.

## Endpoints

- **`GET /<filename>`**: This endpoint serves the `<filename>.html` file from the `public` directory.
  - For example, a `GET` request to `/example` will serve the `example.html` file.
- **`POST /<filename>`**: This endpoint allows you to create or update a file named `<filename>.html` in the `public` directory.
  - The content of the file will be taken from the request body.

This project was created as a learning exercise to understand the fundamentals of HTTP and how web servers work.