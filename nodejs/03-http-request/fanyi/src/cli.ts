// import * as commander from "commander";
// const program = new commander.Command();
import { Command } from "commander";
import { translate } from "./main";
const program = new Command();
program
  .version("0.0.1")
  .name("fy")
  .usage("<word>")
  .argument("<word>")
  .action((word) => {
    console.log("你输入的单词: ", word);
    translate(word);
  });

// 解析参数
program.parse(process.argv);
