import inquirer from "inquirer";
import download from "download-git-repo";
import chalk from "chalk";
import ora from "ora";

import { getTemplateList } from "./list.js";
import { GITHUB_NAME } from "../../config/index.js";
import logger from "../../utils/logger.js";

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
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
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
      ])
      .then((res) => {
        resolve(res);
      });
  });
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

  const answers = await prompt(templateList, templateNames);

  downloadFile(answers);
}

// 下载分支
function downloadFile({ templateName, projectName }) {
  const spinner = ora("项目模板下载中...");
  spinner.start();

  const repoName = `${GITHUB_NAME}/${templateName}.git`;
  return new Promise((resolve, reject) => {
    try {
      download(repoName, projectName, { clone: true }, (err) => {
        if (err) {
          spinner.fail();
          logger.log(chalk.red(`项目生成失败：${err}`));
          return;
        }
        spinner.succeed();
      });
    } catch (error) {
      console.log(error, "error");
    }
  });
}

export default init;
