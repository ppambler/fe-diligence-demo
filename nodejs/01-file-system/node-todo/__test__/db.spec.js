// 一开始这个 fs 是真的 fs
const fs = require("fs");
// 但运行了 mock 后，这个 fs 就是假的 fs 了
jest.mock("fs");
describe("db", () => {
  it("can read", () => {
    expect(fs.x()).toBe("xxx");
  });
});
