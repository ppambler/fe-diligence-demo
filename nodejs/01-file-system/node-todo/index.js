/*
 * @Date: 2022-01-05 18:07:28
 * @FilePath: \fe-diligence-demo\nodejs\01-file-system\node-todo\index.js
 */
const homedir = require("os").homedir(); // 系统 home 目录
const home = process.env.HOME || homedir; // 环境变量 home 目录

const fs = require("fs");
const path = require("path");
const dbPath = path.join(home, ".todo");

module.exports.add = (title) => {
  // 读之前的任务
  // a+ -> 打开文件 进行读取和追加。如果文件不存在，则创建该文件。
  fs.readFile(dbPath, { flag: "a+" }, (error1, data) => {
    if (error1) {
      console.log(error1);
    } else {
      let list;
      try {
        list = JSON.parse(data.toString());
      } catch (e) {
        list = [];
      }
      const task = {
        title,
        done: false,
      };
      list.push(task);
      console.log(list);
      const string = JSON.stringify(list);
      fs.writeFile(dbPath, string + "\n", (error2) => console.log(error2));
    }
  });
  // 往里边添加一个 title 任务
  // 存储任务到文件
};
