// 一开始这个 fs 是真的 fs
const fs = require("fs");
// 但运行了 mock 后，这个 fs 就是假的 fs 了
jest.mock("fs");

const db = require("../db");

describe("db", () => {
  it("can read", async () => {
    const data = [{ title: 1, done: false }];
    fs.setMock("./xxx", null, JSON.stringify(data));
    const list = await db.read("./xxx");
    expect(list).toStrictEqual(data);
  });
});
