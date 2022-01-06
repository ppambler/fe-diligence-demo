// 一开始这个 fs 是真的 fs
const fs = require("fs");
// 但运行了 mock 后，这个 fs 就是假的 fs 了
jest.mock("fs");

const db = require("../db");

describe("db", () => {
  it("can read", async () => {
    const data = [{ title: 1, done: false }];
    fs.setReadFileMock("./xxx", null, JSON.stringify(data));
    const list = await db.read("./xxx");
    expect(list).toStrictEqual(data);
  });
  it("can write", async () => {
    let fakeFile;
    fs.setWriteFileMock("/yyy", (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [
      { title: "见欧阳娜娜", done: true },
      { title: "见迪丽热巴", done: true },
    ];
    await db.write(list, "/yyy");
    expect(fakeFile).toStrictEqual(JSON.stringify(list) + "\n");
  });
});
