#! zx

import {
  checkExist,
  questionForOverwrite,
  checkInput,
  createNormalTemplate,
  createElDialogTemplate,
} from "./libs/libs.mjs";

$.verbose = false;

(async function main() {
  const args = argv["_"];
  if (!checkInput(args)) return;

  let component_name = "";
  let type = "";
  if (args.length == 1) {
    component_name = args[0];
    type = "normal";
  } else if (args.length == 2) {
    component_name = args[1];
    type = args[0];
  }
  const exist = await checkExist(component_name);
  if (exist) {
    if (!questionForOverwrite(component_name)) return;
  } else {
    await $`mkdir ${component_name}`;
  }

  const options = {
    file_name: `${component_name}/${component_name}`,
    component_name,
  };

  if (type == "normal") {
    createNormalTemplate(options);
  } else if (type == "el-dialog") {
    createElDialogTemplate(options);
  }
})();
