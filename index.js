#!/usr/bin/env node

import chalk from "chalk";
import mri from "mri";
import init from "./utils/init.js";

const flags = process.argv.slice(2);

const len4Flags = flags.length;
if (!len4Flags) {
  console.log(chalk.red("请输入参数"));
  process.exit();
}

// 解析命令行参数
const args = mri(flags, {
  alias: {
    component: "c",
    dest: "d",
    page: "p",
  },
});

const { _, ...args4command } = args;

console.log(args4command, "args4command");

if (_.includes("init")) {
  init();
} else {
}
