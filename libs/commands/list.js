import request from "request";
import chalk from "chalk";
import ora from "ora";

import { TEMPLATE_URL } from "../../config/index.js";
import logger from "../../utils/logger.js";

export function getTemplateList() {
  return new Promise((resolve, reject) => {
    request(
      {
        url: TEMPLATE_URL,
        headers: {
          "User-Agent": "cowry-cli",
        },
      },
      function (err, res, body) {
        if (err) {
          reject(err);
          return;
        }

        resolve(body);
      }
    );
  });
}

export default function list() {
  var spinner = ora("downloading template...");
  spinner.start();
  getTemplateList().then(
    function (resp) {
      spinner.stop();
      console.log("  模版列表:");
      console.log();

      JSON.parse(resp).forEach(function (repo) {
        console.log(
          "  " +
            chalk.red("★") +
            "  " +
            chalk.green(repo.name) +
            " - " +
            repo.description
        );
      });
    },
    function (err) {
      spinner.stop();
      logger.fail(err);
    }
  );
}
