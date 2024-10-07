// @ts-check
const fs = require("fs/promises");
const { findTsVersion } = require("./find-ts-version");

const RULES = {
  XOR: "test/xor.ts4_9plus.ts",
};

/**
 *
 * @param {object} json
 * @param {string} tsVersion
 */
const applyRules = (json, tsVersion) => {
  // reset
  let exclude = (json.exclude || []).filter((v) => !Object.values(RULES).includes(v));

  if (["4.5", "4.6", "4.7", "4.8"].includes(tsVersion)) {
    exclude.push(RULES.XOR);
  }

  json.exclude = exclude;
};

/**
 * @param {string} tsVersion
 * @param {string} filename
 */
const updateTsConfig = async (tsVersion, filename) => {
  const buffer = await fs.readFile(filename);
  const jsonString = buffer.toString("utf8");
  const json = JSON.parse(jsonString);

  applyRules(json, tsVersion);

  await fs.writeFile(filename, JSON.stringify(json, null, "  "));
};

const tsVersion = findTsVersion("yarn.lock");
if (tsVersion === undefined) {
  throw new Error("Cannot find TypeScript version in yarn.lock");
}
updateTsConfig(tsVersion, "tsconfig.test.json");
