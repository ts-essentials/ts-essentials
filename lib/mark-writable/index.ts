import { Writable } from "../writable";
import { WritableKeys } from "../writable-keys";

export type MarkWritable<Type, Keys extends keyof Type> = Type extends Type
  ? Readonly<Type> & Writable<Omit<Type, Exclude<keyof Type, WritableKeys<Type & object> | Keys>>>
  : never;
