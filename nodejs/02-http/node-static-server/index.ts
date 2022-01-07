import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
const iconv = require("iconv-lite");
const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  console.log(request.method);
  console.log(request.url);
  console.log(request.headers);
  const array = [];
  request.on("data", (chunk) => {
    array.push(chunk);
  });
  request.on("end", () => {
    console.log(array);
    console.log(Buffer.concat(array));
    const body = iconv.decode(Buffer.concat(array), "GBK");
    console.log(body);
    response.end("hi");
  });
});

server.listen(8888);
