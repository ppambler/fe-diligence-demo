/*
 * @Date: 2022-01-05 20:23:54
 * @FilePath: \fe-diligence-demo\nodejs\01-file-system\node-todo\cli.js
 */
const { Command } = require("commander");
const program = new Command();
const api = require("./index");
const pkg = require("./package.json");
program.version(pkg.version);
// 选项用 - 或 -- 开头
// program
//   .version("0.0.1")
//   .option("-x, --xxx", "this is xxx")
//   .option("-y, --yyy", "this is yyy");

// 这个字符串里边的 <> 是有意义的 -> node index.js 1 2 -> action 会 log 出 1 2
// action 即 这个子命令的作用是啥
// program
//   .command("add <number1> <number2>")
//   .description("plus")
//   .action((first, second) => {
//     console.log(first, second);
//     console.log(Number(first) + Number(second));
//   });

// 子命令后边可传不定个数的参数
program
  .command("add")
  .argument("<taskName...>")
  .description("add a task")
  .action((args) => {
    const words = args.join(" ");
    api.add(words).then(
      () => console.log("添加成功"),
      () => console.log("添加失败")
    );
  });
program
  .command("clear")
  .description("clear all tasks")
  .action(() => {
    api.clear().then(
      () => console.log("清除完毕"),
      () => console.log("清除失败")
    );
  });

// option 和 command 的注册必须放在 parse 之前

// options -> 你用了 -x 或 -xxx，那么它的值就是 { xxx: true }
// 我同时写 option 和 command，option 即失效了，不管我输入 -x -y 还是什么的，都会展示 -h 的效果

if (process.argv.length === 2) {
  //说明用户直接运行 node cli.js
  void api.showAll(); // void 可以清除没有处理 .then() 的 Promise 警告
} else {
  program.parse(process.argv);
}
