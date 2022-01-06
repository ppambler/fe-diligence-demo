let fs = {};
let mocks = [];
fs.setMock = (path, error, data) => {
  mocks[path] = [error, data];
};
const data = [{ title: 1, done: false }];
fs.setMock("./xxx", null, JSON.stringify(data));
console.log(mocks);
