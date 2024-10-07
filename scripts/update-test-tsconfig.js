// @ts-check
const fs = require("fs/promises");
const { findTsVersion } = require("./find-ts-version");

const CONDITIONAL_FILES = {
  XOR_FUNCTION_PARAMETERS: "test/xor.function-parameters.ts",
};

/**
 *
 * @param {object} json
 * @param {string} tsVersion
 */
const applyRules = (json, tsVersion) => {
  const ALL_CONDITIONAL_FILES = Object.values(CONDITIONAL_FILES);

  // reset `exclude` to the original state, without any conditional files

  let exclude = (json.exclude || []).filter((v) => !ALL_CONDITIONAL_FILES.includes(v));

  if (["4.5", "4.6", "4.7", "4.8"].includes(tsVersion)) {
    // XOR utility type never inferred the right types in functions parameters
    // for TypeScript versions between 4.5.x and 4.8.x

    exclude.push(CONDITIONAL_FILES.XOR_FUNCTION_PARAMETERS);
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
