// @ts-check
const fs = require("fs");

const FIRST_TYPESCRIPT_LINE = /typescript\@\^?(\d+.\d+(.\d+)?):/;
const TYPESCRIPT_VERSION_LINE = /version "(\d+.\d+)(.\d+)?"/;

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

/**
 *
 *
 * @param {string} tsVersion
 */
const writeTsVersion = (tsVersion, filename) => {
  fs.writeFileSync(filename, `export type TsVersion = "${tsVersion}";`);
};

const tsVersion = findTsVersion("yarn.lock");
if (tsVersion === undefined) {
  throw new Error("Cannot find TypeScript version in yarn.lock");
}
writeTsVersion(tsVersion, "test/ts-version.ts");
