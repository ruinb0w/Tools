#! zx

$.verbose = false;
import { handleOutput } from "./utils/util.mjs";

async function main() {
  const args = argv["_"];
  console.log("args", args);
  if (args.length != 1) {
    console.log(chalk.yellow("usage:"), "push.mjs COMMIT_CONTENT");
    console.log('if there is multiple words, then use "" to wrap the content');
    return;
  }
  const commit_content = args[0];

  let output = await $`git add -A`;
  console.log(chalk.bgGreen("ok"), "All the changes have been cached.");

  try {
    output = await $`git commit -m ${commit_content}`;
  } catch (err) {
    output = err;
  }
  if (!handleOutput(output)) return;
  console.log(chalk.bgGreen("ok"), "Cache has been committed.");

  output = await $`git push`;
  if (!handleOutput) return;
  console.log(chalk.bgGreen("ok"), "Commit has been pushed to remote.");
}

main();
