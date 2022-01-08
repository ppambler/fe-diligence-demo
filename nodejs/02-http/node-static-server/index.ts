import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";
import { off } from "process";
const server = http.createServer();
const publicDir = p.resolve(__dirname, "public"); // 会得到当前目录所在的绝对路径

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { url: path, method, headers } = request;
  console.log(path);
  const { pathname, search } = url.parse(path);
  // /index.html -> index.html
  let filename = pathname.substring(1);
  if (filename === "") {
    filename = "index.html";
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      // console.log(error);
      if (error.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, "404.html"), (error, data) => {
          response.end(data);
        });
      } else if (error.errno === -4068) {
        response.statusCode = 403;
        response.setHeader("content-type", "text/plain;charset=utf8");
        response.end("无权查看目录内容");
      } else {
        response.statusCode = 500;
        response.setHeader("content-type", "text/plain;charset=utf8");
        response.end("服务器繁忙，请稍后再试");
      }
    } else {
      response.end(data);
    }
  });
});

server.listen(8888);
