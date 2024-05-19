import { version } from "typescript";
import { runOmitPropertiesBenchmarks } from "./omit-properties";
import { runPickKeysBenchmarks } from "./pick-keys";

const [majorVersion, minorVersion] = version.split(".");

const majorMinorVersion = `${majorVersion}.${minorVersion}`;
console.log(`\nRunning benchmarks for TypeScript@${majorMinorVersion}\n`);

runOmitPropertiesBenchmarks(majorMinorVersion);
runPickKeysBenchmarks(majorMinorVersion);
