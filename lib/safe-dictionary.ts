import { KeyofBase } from "./key-of-base";

/**
 * Like Dictionary, but:
 *  - ensures type safety of index access
 *  - does not enforce key exhaustiveness
 */
export type SafeDictionary<Type, Keys extends KeyofBase = string> = { [key in Keys]?: Type };
