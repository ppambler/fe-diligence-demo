import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as path from "path";
const server = http.createServer();
const publicDir = path.resolve(__dirname, "public"); // 会得到当前目录所在的绝对路径

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { url, method, headers } = request;
  switch (url) {
    case "/index.html":
      fs.readFile(path.resolve(publicDir, "index.html"), (error, data) => {
        if (error) throw error;
        response.setHeader("Content-type", "text/html;charset=utf-8");
        response.end(data.toString());
      });
      break;
    case "/main.js":
      fs.readFile(path.resolve(publicDir, "main.js"), (error, data) => {
        if (error) throw error;
        response.setHeader(
          "Content-type",
          "application/javascript;charset=utf-8"
        );
        response.end(data.toString());
      });
      break;
    case "/style.css":
      fs.readFile(path.resolve(publicDir, "style.css"), (error, data) => {
        if (error) throw error;
        response.setHeader("Content-type", "text/css;charset=utf-8");
        response.end(data.toString());
      });
      break;
  }
});

server.listen(8888);
