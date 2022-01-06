// 这是一个假的 fs 模块，专门用来做测试的
const fs = jest.createMockFromModule("fs");
// 这是一个真的 fs 模块，我们要使用它的 API 去创建一个假文件
const _fs = jest.requireActual("fs");

// 把真的 _fs 的 API 搬运到假的 fs 身上
Object.assign(fs, _fs);
const mocks = {};
fs.setMock = (path, error, data) => {
  mocks[path] = [error, data];
};
// fs.readFile('xxx', fn)
fs.readFile = (path, options, callback) => {
  // ./xxx { flag: 'a+' } [Function (anonymous)]
  // 我们的 db.read 会调用这个我们自己写的 readFile
  console.log(
    "🚀 ~ file: fs.js ~ line 14 ~ path, options, callback",
    path,
    options,
    callback
  );
  // 如果只传了路径参数和回调，那么就会把这个回调赋值给第三个参数 callback
  if (!callback) {
    callback = options;
    console.log("没传第三个参数 callback");
  }
  if (path in mocks) {
    // 执行了这个
    console.log(1);
    // callback(mocks[path][0], mocks[path][1]) // 可以简写成下面的形式
    callback(...mocks[path]);
  } else {
    console.log(2);
    _fs.readFile(path, options, callback);
  }
};
module.exports = fs;
