import { KeyofBase } from "./key-of-base";

/**
 * Like Record, but can be used with only one argument.
 * Useful, if you want to make sure that all of the keys of a finite type are used.
 */
export type Dictionary<Type, Keys extends KeyofBase = string> = { [key in Keys]: Type };
