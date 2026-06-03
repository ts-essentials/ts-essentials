// @ts-check
const fs = require("fs");

/**
 * Finds TypeScript version in a filename
 *
 * @param {string} filename
 * @returns {string | undefined}
 */
const findTsVersion = (filename) => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const json = JSON.parse(data);
    return json.packages?.["node_modules/typescript"]?.version;
  } catch {
    return undefined;
  }
};

module.exports = { findTsVersion };
