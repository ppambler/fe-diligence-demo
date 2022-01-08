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
    response.statusCode = 404;
    response.setHeader("Xxx-hi", "Hello World");
    response.setHeader("Content-Type", "image/png");
    response.write("ImageData\n");
    response.write("1\n");
    response.write("2\n");
    response.write("3\n");
    response.write("4\n");
    response.end("end\n");
  });
});

server.listen(8888);
