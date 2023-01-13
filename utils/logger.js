import chalk from "chalk";

/**
 * Prefix.
 */

var prefix = "   cowry-cli";
var sep = chalk.gray("·");

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
function log(message) {
  console.log(chalk.white(prefix), sep, message);
}

function fail(message) {
  if (message instanceof Error) message = String(message.message).trim();
  console.error(chalk.red(prefix), sep, message);
  process.exit(1);
}

function success(message) {
  console.error(chalk.green(prefix), sep, message);
  process.exit(0);
}

export default {
  log,
  fail,
  success,
};
