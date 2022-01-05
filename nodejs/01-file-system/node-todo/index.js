const db = require("./db.js");
const inquirer = require("inquirer");
module.exports.add = async (title) => {
  //读取之前的任务
  const list = await db.read();
  //往里边添加一个 title 任务
  list.push({ title, done: false });
  //存储任务到文件
  await db.write(list);
  console.log(
    "🚀 ~ file: index.js ~ line 9 ~ module.exports.add= ~ list",
    list
  );
};

module.exports.clear = async () => {
  await db.write([]);
};

module.exports.showAll = async () => {
  console.log("showAll");
  //读取之前的任务
  const list = await db.read();
  //打印之前的任务
  // list.forEach((task, index) => {
  //   console.log(`${task.done ? "[✔]" : "[]"} ${index + 1} - ${task.title}`);
  // });
  inquirer
    .prompt({
      type: "list",
      name: "index",
      message: "请选择你想要操作的任务",
      choices: [
        { name: "退出", value: "-1" },
        ...list.map((task, index) => {
          return {
            name: `${task.done ? "[✔]" : "[_]"} ${index + 1} - ${task.title}`,
            value: index.toString(),
          };
        }),
        { name: "+ 创建任务", value: "-2" },
      ],
    })
    .then((answer) => {
      const current = parseInt(answer.index);
      const index = current + 1;
      if (index > 0) {
        //选择了一个任务
        inquirer
          .prompt({
            type: "list",
            name: "action",
            message: "请选择操作",
            choices: [
              { name: "退出", value: "quit" },
              { name: "已完成", value: "markAsDone" },
              { name: "未完成", value: "markAsUnDone" },
              { name: "改标题", value: "updateTitle" },
              { name: "删除", value: "remove" },
            ],
          })
          .then((answer2) => {
            switch (answer2.action) {
              case "markAsDone":
                list[current].done = true;
                db.write(list);
                break;
              case "markAsUnDone":
                list[current].done = false;
                db.write(list);
                break;
              case "updateTitle":
                inquirer
                  .prompt({
                    type: "input",
                    name: "title",
                    message: "新的标题",
                    default: list[current].title,
                  })
                  .then((answer) => {
                    list[current].title = answer.title;
                    db.write(list);
                  });
                break;
              case "remove":
                list.splice(current, 1);
                db.write(list);
                break;
            }
          });
      } else if (index === -1) {
        //创建一个任务
        inquirer
          .prompt({
            type: "input",
            name: "title",
            message: "输入任务标题",
          })
          .then((answer) => {
            list.push({
              title: answer.title,
              done: false,
            });
            db.write(list);
          });
      }
    });
};
