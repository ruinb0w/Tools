export function handleOutput(output) {
  if (output.stdout) console.log(output.stdout);
  if (output.stderr) console.log(chalk.red("error message:"), output.stderr);
  return output.exitCode == 0;
}
