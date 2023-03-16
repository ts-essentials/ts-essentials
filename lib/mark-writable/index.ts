import { Writable } from "../writable";

export type MarkWritable<Type, Keys extends keyof Type> = Type extends Type
  ? Omit<Type, Keys> & Writable<Pick<Type, Keys>>
  : never;
