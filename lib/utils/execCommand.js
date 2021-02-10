const { execSync } = require("child_process");

const maxBuffer100MB = 1000 * 1000 * 100;

const exec = (command) =>
  execSync(command, {
    encoding: "utf8",
    maxBuffer: maxBuffer100MB,
    stdio: "pipe",
  }).trim();

module.exports = exec;
