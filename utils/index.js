import { COMMANDS } from "../config/index.js";

// 求两个数组的交集
export const intersection = (arr1, arr2) =>
  Array.from(new Set([...arr1].filter((x) => arr2.includes(x) > -1)));

//根据参数 获取有效的command
export const getValidCommands = (list = []) => {
  const commandList = intersection(list, COMMANDS);
  return commandList[0] || "";
};
