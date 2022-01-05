const homedir = require("os").homedir(); // 系统 home 目录
const home = process.env.HOME; // 环境变量 home 目录
module.exports.add = () => {
  console.log(home);
  console.log(homedir);
};
