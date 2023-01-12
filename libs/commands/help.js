import chalk from "chalk";

export default function help() {
  console.log("Usage: cowry [options] [command]");
  console.log();

  console.log(chalk.bold.blue("Options:"));
  console.log("  -V, --version    output the version number.");
  console.log("  -h, --help       display help for command.");
  console.log();

  console.log(chalk.bold.blue("Commands:"));
  console.log("  init             Initializes the project template.");
  console.log("  list             List of available modules.");

  console.log();
}
