// import * as commander from "commander";
// const program = new commander.Command();
import { Command } from "commander";
const program = new Command();
program.version("0.0.1").name("fy").usage("<english>");

// 解析参数
program.parse(process.argv);
