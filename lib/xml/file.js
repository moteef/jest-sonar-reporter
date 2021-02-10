"use strict";

const execCommand = require("../utils/execCommand");
const testCase = require("./testCase");
const path = require("path");

module.exports = function file(testResult, config) {
  let testFilePath;
  switch (config.pathOptions) {
    case "absolute":
      testFilePath = testResult.testFilePath;
      break;
    case "relative":
      testFilePath = path.relative(process.cwd(), testResult.testFilePath);
      break;
    case "gitRoot":
      const gitRoot = execCommand("git rev-parse --show-toplevel");
      testFilePath = path.relative(gitRoot, testResult.testFilePath);
      break;
    default:
      break;
  }

  const aFile = [{ _attr: { path: testFilePath } }];
  const testCases = testResult.testResults.map(testCase);

  return { file: aFile.concat(testCases) };
};
