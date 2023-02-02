import { Writable } from "./writable";

/** Mark some properties as writable, leaving others unchanged */
export type MarkWritable<Type, Keys extends keyof Type> = Type extends Type
  ? Omit<Type, Keys> & Writable<Pick<Type, Keys>>
  : never;
