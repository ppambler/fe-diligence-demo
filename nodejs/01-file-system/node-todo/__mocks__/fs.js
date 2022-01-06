// 这是一个假的 fs 模块
const fs = jest.createMockFromModule("fs");
fs.x = () => {
  console.log("hi");
  return "xxx";
};
module.exports = fs;
