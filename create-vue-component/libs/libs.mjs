export function kebabize(str) {
  return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (cap, ofs) => {
    return (ofs ? "-" : "") + cap.toLowerCase();
  });
}

export async function checkExist(file_name) {
  try {
    await $`ls ${file_name}`;
    return true;
  } catch (err) {
    return false;
  }
}

export async function questionForOverwrite(file_name) {
  const input = await question(
    `${chalk.yellow(
      "warning: "
    )}${file_name} is exist, did you want to overwirte it? [y/N]: `
  );
  if (input == "y") return true;
}

export function checkInput(args) {
  if (args.length != 1 && args.length != 2) {
    console.log(chalk.yellow("usage:"), "cvue.mjs [OPTION] COMPONENT_NAME");
    console.log(
      chalk.yellow("OPTION:"),
      "el-dialog: create el-dialog boilerplate"
    );
    return false;
  }
  return true;
}

import { createElDialogTemplate } from "./elDialogTemplate.mjs";
import { createNormalTemplate } from "./normalTemplate.mjs";
export { createNormalTemplate, createElDialogTemplate };
