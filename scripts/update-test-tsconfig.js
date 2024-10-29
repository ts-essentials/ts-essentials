// @ts-check
const fs = require("fs/promises");
const semver = require("semver");
const { findTsVersion } = require("./find-ts-version");

const CONDITIONAL_FILES = {
  "test/xor.function-parameters.ts": "4.5 - 4.8",
  "test/readonly-keys-arrays-and-index-signatures.ts": "<5.3",
  "test/writable-keys-arrays-and-index-signatures.ts": "<5.3",
};

/**
 *
 * @param {object} json
 * @param {string} tsVersion
 */
const applyRules = (json, tsVersion) => {
  const ALL_CONDITIONAL_FILES = Object.keys(CONDITIONAL_FILES);

  // reset `exclude` to the original state, without any conditional files

  let exclude = (json.exclude || []).filter((v) => !ALL_CONDITIONAL_FILES.includes(v));

  Object.entries(CONDITIONAL_FILES).forEach(([file, version]) => {
    if (semver.satisfies(tsVersion, version)) {
      exclude.push(file);
    }
  });

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
