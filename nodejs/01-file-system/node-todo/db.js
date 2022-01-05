/*
 * @Date: 2022-01-05 22:15:49
 * @FilePath: \fe-diligence-demo\nodejs\01-file-system\node-todo\db.js
 */
const homedir = require("os").homedir(); // 系统 home 目录
const home = process.env.HOME || homedir; // 环境变量 home 目录

const fs = require("fs");
const path = require("path");
const dbPath = path.join(home, ".todo");

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (error, data) => {
        if (error) {
          return reject(error);
        }
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (e) {
          list = [];
        }
        resolve(list);
      });
    });
  },
  write(list, path = dbPath) {
    const string = JSON.stringify(list);
    return new Promise((resolve, reject) => {
      fs.writeFile(path, string + "\n", (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  },
};
module.exports = db;
