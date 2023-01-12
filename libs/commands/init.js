import inquirer from "inquirer";

async function init() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "请输入项目名称：",
    },
    {
      type: "list",
      name: "templateName",
      message: "请选择模版：",
      default: "vue",
      choices: ["vue", "vue-ts", "vue-basic"],
    },
  ]);

  console.log(answers, "answers");
}

export default init;
