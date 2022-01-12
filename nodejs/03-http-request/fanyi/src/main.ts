import * as https from "https";
import * as querystring from "querystring";
import md5 = require("md5");
import { appId, appSecret } from "./private";

export const translate = (word) => {
  console.log("要翻译的单词: ", word);
  console.log("翻译中...");
  // console.log(md5("123")); // 202cb962ac59075b964b07152d234b70

  // ?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4

  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);
  const query: string = querystring.stringify({
    q: word,
    from: "en",
    to: "zh",
    appid: appId,
    salt: salt,
    sign: sign,
  });
  // console.log(query); // q=hi&sign=1234
  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let chunks = [];
    let count = 0;
    response.on("data", (chunk) => {
      chunks.push(chunk);
      count += chunk.length;
    });
    response.on("end", () => {
      console.log(count);
      const string = Buffer.concat(chunks, count).toString();
      console.log(string);
      type BaiduResult = {
        error_code?: string;
        error_msg?: string;
        from: string;
        to: string;
        trans_result: { src: string; dst: string }[];
      };
      const object: BaiduResult = JSON.parse(string);
      console.log(object.trans_result[0].dst);
    });
  });

  request.on("error", (e) => {
    console.error(e);
  });
  request.end();
};
