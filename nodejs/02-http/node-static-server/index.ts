import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
const iconv = require("iconv-lite");
const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  console.log(request.method);
  console.log(request.url);
  console.log(request.headers);
  const array = [];
  let totalLength = 0;

  request.on("data", (chunk) => {
    array.push(chunk);
    totalLength += chunk.length;
  });
  request.on("end", () => {
    console.log(array);
    console.log(Buffer.concat(array, totalLength));
    const body = iconv.decode(Buffer.concat(array, totalLength), "GBK");
    console.log(body);
    response.end("hi");
  });
});

server.listen(8888);
