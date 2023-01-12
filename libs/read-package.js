import fs from "node:fs";

export default function readPackageJson() {
  const __dir__ = process.cwd();
  const content = fs.readFileSync(`${__dir__}/package.json`, "utf-8");

  try {
    return JSON.parse(content);
  } catch (error) {
    return {
      version: "1.0.0",
    };
  }
}
