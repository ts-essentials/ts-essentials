import { IsFullyWritable } from "./is-fully-writable";

/** Gets keys of an object which are readonly */
export type ReadonlyKeys<Type extends object> = {
  [Key in keyof Type]-?: IsFullyWritable<Pick<Type, Key>> extends true ? never : Key;
}[keyof Type];
