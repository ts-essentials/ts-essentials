// @ts-check
const fs = require("fs");

const FIRST_TYPESCRIPT_LINE = /typescript@\S*:/;
/**
 * Regular expression to capture the TypeScript version number.
 *
 * The version captured by this regex is currently used in two ways:
 * 1. To generate the `TsVersion` type in [`test/ts-version.ts`](../test/ts-version.ts), which is then used in unit tests to handle version-specific output differences.
 * 2. Used with the `semver` library in [`update-test-tsconfig.js`](./update-test-tsconfig.js) to conditionally exclude test files.
 */
const TYPESCRIPT_VERSION_LINE = /version "(\d+\.\d+\.\d+)"/;

/**
 * Finds TypeScript version in a filename
 *
 * @param {string} filename
 * @returns {string | undefined}
 */
const findTsVersion = (filename) => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const lines = data.split("\n").map((line) => line.trim());
    const typescriptLineIndex = lines.findIndex((line) => FIRST_TYPESCRIPT_LINE.test(line));
    const matched = lines[typescriptLineIndex + 1].match(TYPESCRIPT_VERSION_LINE);
    if (matched !== null) {
      return matched[1];
    }
    return undefined;
  } catch {
    return undefined;
  }
};

module.exports = { findTsVersion };
