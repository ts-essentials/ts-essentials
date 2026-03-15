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

const tsVersion = findTsVersion("package-lock.json");
if (tsVersion === undefined) {
  throw new Error("Cannot find TypeScript version in package-lock.json");
}
writeTsVersion(tsVersion, "lib/ts-version.ts");
