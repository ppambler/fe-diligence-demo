import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";
const server = http.createServer();
const publicDir = p.resolve(__dirname, "public"); // 会得到当前目录所在的绝对路径

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { url: path, method, headers } = request;
  const object = url.parse(path);
  const { pathname, search } = object;
  switch (pathname) {
    case "/index.html":
      fs.readFile(p.resolve(publicDir, "index.html"), (error, data) => {
        if (error) throw error;
        response.setHeader("Content-type", "text/html;charset=utf-8");
        response.end(data.toString());
      });
      break;
    case "/main.js":
      fs.readFile(p.resolve(publicDir, "main.js"), (error, data) => {
        if (error) throw error;
        response.setHeader(
          "Content-type",
          "application/javascript;charset=utf-8"
        );
        response.end(data.toString());
      });
      break;
    case "/style.css":
      fs.readFile(p.resolve(publicDir, "style.css"), (error, data) => {
        if (error) throw error;
        response.setHeader("Content-type", "text/css;charset=utf-8");
        response.end(data.toString());
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
  }
});

server.listen(8888);
