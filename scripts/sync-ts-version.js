// @ts-check
const fs = require("fs");
const { findTsVersion } = require("./find-ts-version");

/**
 * @param {string} tsVersion
 * @param {string} filename
 */
const writeTsVersion = (tsVersion, filename) => {
  fs.writeFileSync(filename, `export type TsVersion = "${tsVersion}";\n`);
};

const tsVersion = findTsVersion("yarn.lock");
if (tsVersion === undefined) {
  throw new Error("Cannot find TypeScript version in yarn.lock");
}
writeTsVersion(tsVersion, "test/ts-version.ts");
