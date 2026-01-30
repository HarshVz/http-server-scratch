# Building an HTTP Server from Scratch: A Journey into the World of HTTP

Recently, I embarked on a journey to build an HTTP server from scratch using Node.js and TypeScript. This project was a fantastic learning experience that helped me understand the inner workings of HTTP and how web servers handle requests and responses. In this blog post, I'll walk you through my approach, the challenges I faced, and the improvements that can be made to this basic implementation.

## The Initial Approach

My goal was to create a simple server that could handle `GET` and `POST` requests without relying on existing frameworks like Express or Fastify. I wanted to work at a lower level to truly understand the fundamentals. The `node:net` module in Node.js was the perfect tool for this, as it provides a way to create a raw TCP server.

The core of the server is a TCP server that listens for incoming connections. When a client connects, the server receives data as a stream of bytes, which needs to be parsed to understand the client's request.

## Parsing HTTP Requests

An HTTP request has a specific structure:

1.  **Start-line**: Contains the HTTP method (`GET`, `POST`, etc.), the request target (e.g., `/`, `/about`), and the HTTP version (e.g., `HTTP/1.1`).
2.  **Headers**: A series of key-value pairs that provide additional information about the request.
3.  **Body**: The actual data being sent to the server (e.g., for a `POST` request).

In my implementation, I read the incoming data, convert it to a string, and then parse it to extract the method, path, headers, and body. This manual parsing was a crucial step in understanding the HTTP protocol.

## Handling Requests and Sending Responses

Once the request is parsed, the server needs to decide how to respond. In my current implementation:

-   For `GET` requests, the server looks for a corresponding `.html` file in the `public` directory and sends its content back to the client.
-   For `POST` requests, the server takes the body of the request and writes it to a file in the `public` directory.

The HTTP response also has a specific structure, including a status line (e.g., `HTTP/1.1 200 OK`), headers, and a body. My `HttpResponse` class is responsible for constructing these responses, setting the correct headers like `Content-Type` and `Content-Length`, and sending the response back to the client.

## What I've Learned

Building this server has been an eye-opening experience. Here are some of my key takeaways:

-   **HTTP is just text**: At its core, HTTP is a text-based protocol. Understanding the structure of requests and responses is key.
-   **The importance of headers**: Headers play a critical role in HTTP, from indicating the content type to managing connections.
-   **The power of Node.js**: The `node:net` module provides a powerful and flexible way to build network applications.

## Potential Improvements

This implementation is a great starting point, but there are many ways it can be improved and extended. Here are some ideas:

-   **More HTTP Methods**: Implement support for other HTTP methods like `PUT`, `DELETE`, and `PATCH`.
-   **Routing**: Instead of just mapping paths to files, a more robust routing system could be implemented to handle different routes with different logic.
-   **Middleware**: Introduce a middleware pattern to handle tasks like logging, authentication, and error handling in a more organized way.
-   **Content Types**: Add support for serving different content types, such as JSON, CSS, and JavaScript files, by setting the appropriate `Content-Type` header.
-   **Error Handling**: Improve error handling to provide more meaningful error messages to the client.
-   **Security**: Implement security best practices, such as sanitizing user input and preventing path traversal attacks.
-   **Asynchronous File Operations**: The current implementation uses synchronous file I/O (`fs.readFileSync`, `fs.writeFileSync`), which can block the event loop. Using asynchronous methods (e.g., `fs.readFile`, `fs.writeFile`) would improve performance and scalability.
-   **Streaming**: For large files, it would be more efficient to stream the response body instead of reading the entire file into memory at once.

## Conclusion

Building an HTTP server from scratch is a challenging but rewarding project. It provides a deep understanding of the protocols that power the web. I encourage you to try it yourself and see what you can learn!
