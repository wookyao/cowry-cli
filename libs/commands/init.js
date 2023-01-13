import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { getTemplateList } from "./list.js";

// 展示模版列表
function showTemplate(list) {
  list.forEach((item) => {
    console.log(
      "  " +
        chalk.red("★") +
        "  " +
        chalk.green(item.name) +
        " - " +
        item.description
    );
  });
  console.log();
}

// 命令行交互
async function prompt(templateList, templateNames) {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "请输入项目名称：",
      validate(val) {
        if (val === "") {
          console.log(chalk.yellow("项目名称不能为空."));
          return;
        } else {
          return true;
        }
      },
    },
    {
      type: "input",
      name: "templateName",
      message: "请选择模版：",
      validate(val) {
        if (val === "") {
          console.log(chalk.yellow("模板名称不能为空"));
          return;
        }
        if (templateNames.indexOf(val) == -1) {
          console.log();
          console.log(chalk.red("无此模板，请从下列模版中创建："));
          console.log();
          showTemplate(templateList);
          return;
        }

        return true;
      },
    },
  ]);

  return answers;
}

async function init() {
  var spinner = ora("initialization template...");
  spinner.start();
  let res = await getTemplateList();
  spinner.stop();

  let templateList = [],
    templateNames = [];

  try {
    templateList = JSON.parse(res);
    templateNames = templateList.map((item) => item.name);
  } catch (error) {}

  const answers = prompt(templateList, templateNames);
  console.log("answers", answers);
}

export default init;
