import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";
const server = http.createServer();
const publicDir = p.resolve(__dirname, "public"); // 会得到当前目录所在的绝对路径

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { url: path, method, headers } = request;
  const { pathname, search } = url.parse(path);
  // /index.html -> index.html
  const filename = pathname.substring(1);
  console.log("🚀 ~ file: index.ts ~ line 14 ~ server.on ~ filename", filename);
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      console.log("🚀 ~ file: index.ts ~ line 17 ~ fs.readFile ~ error", error);
      response.statusCode = 404;
      response.setHeader("Content-type", "text/plain;charset=utf8");
      response.end("你要的文件不存在! ");
    } else {
      response.end(data.toString());
    }
  });
});

server.listen(8888);
