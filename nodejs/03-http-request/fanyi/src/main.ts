import * as https from "https";
import * as querystring from "querystring";
import md5 = require("md5");
import { appId, appSecret } from "./private";

// 可以接收任意字符串作为这个对象的 key，也就是可以写很多个属性呗
type ErrorMap = {
  [key: string]: string;
};

const errorMap: ErrorMap = {
  52001: "请求超时",
  52002: "系统错误",
  52003: "未授权用户",
  54000: "必填参数为空",
  54001: "签名错误",
  54003: "访问频率受限",
  54004: "账户余额不足",
  54005: "长 query 请求频繁",
  58000: "客户端 IP 非法",
  58001: "译文语言方向不支持",
  58002: "服务当前已关闭",
  90107: "认证未通过或未生效",
  unknown: "服务器繁忙",
};

export const translate = (word: string) => {
  console.log("要翻译的单词: ", word);
  console.log("翻译中...");
  // console.log(md5("123")); // 202cb962ac59075b964b07152d234b70

  // ?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4
  let to, from;
  if (/[a-zA-Z]/.test(word)) {
    to = "zh";
    from = "en";
  } else {
    to = "en";
    from = "zh";
  }
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);
  const query: string = querystring.stringify({
    q: word,
    from,
    to,
    appid: appId,
    salt,
    sign,
  });
  // console.log(query); // q=hi&sign=1234
  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let chunks: Buffer[] = [];
    let count = 0;
    response.on("data", (chunk) => {
      chunks.push(chunk);
      count += chunk.length;
    });
    response.on("end", () => {
      // console.log(count);
      const string = Buffer.concat(chunks, count).toString();
      // console.log(string);
      type BaiduResult = {
        error_code?: string;
        error_msg?: string;
        from: string;
        to: string;
        trans_result: { src: string; dst: string }[];
      };
      const object: BaiduResult = JSON.parse(string);
      if (object.error_code) {
        console.error(errorMap[object.error_code] || object.error_msg);
        process.exit(2);
      } else {
        // API 不够高级，只能翻译成一个中文或英文
        object.trans_result.map((obj) => {
          console.log(obj.dst);
        });
        process.exit(0);
      }
    });
  });

  request.on("error", (e) => {
    console.error(e);
  });
  request.end();
};
