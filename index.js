#!/usr/bin/env node

import chalk from "chalk";
import mri from "mri";
import commands from "./libs/commands/index.js";
import help from "./libs/help.js";
import readPackageJson from "./libs/read-package.js";
import { getValidCommands } from "./utils/index.js";

const flags = process.argv.slice(2);
// 解析命令行参数
const args = mri(flags, {
  alias: {
    component: "c",
    dest: "d",
    page: "p",
    help: "h",
    version: "V",
  },
});

const { _, ...args4command } = args;

console.log(args4command, "args4command", _);

const len4Flags = flags.length;

if (!len4Flags || args4command.help) {
  help();
  process.exit();
}

if (args4command.version) {
  const { version } = readPackageJson();
  console.log("Cowry CLI ", chalk.red(version || "1.0.0"));
  process.exit();
}

// 过滤输入的指令
const command = getValidCommands(_);

if (command) {
  if (commands.hasOwnProperty(command)) {
    commands[command]();
  }
} else {
}
