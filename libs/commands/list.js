import request from "request";
import chalk from "chalk";
import { TEMPLATE_URL } from "../../config/index.js";
import logger from "../../utils/logger.js";

export default function list() {
  request(
    {
      url: TEMPLATE_URL,
      headers: {
        "User-Agent": "cowry-cli",
      },
    },
    function (err, res, body) {
      if (err) logger.fail(err);

      console.log("  Available official templates:");
      console.log();
      JSON.parse(body).forEach(function (repo) {
        console.log(
          "  " +
            chalk.red("★") +
            "  " +
            chalk.green(repo.name) +
            " - " +
            repo.description
        );
      });
    }
  );
}
