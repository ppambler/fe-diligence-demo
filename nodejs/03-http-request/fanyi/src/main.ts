import * as https from "https";
import * as querystring from "querystring";
import md5 = require("md5");

export const translate = (word) => {
  console.log("word，翻译中...");
  console.log(word);
  // console.log(md5("123")); // 202cb962ac59075b964b07152d234b70

  // ?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4

  const appId = "???";
  const appSecret = "???";
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
  console.log(query); // q=hi&sign=1234
  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4",
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("data", (d) => {
      console.log("statusCode:", res.statusCode);
      console.log(Buffer.concat(data).toString());
      console.log(d.toString());
      process.stdout.write(d);
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
};
