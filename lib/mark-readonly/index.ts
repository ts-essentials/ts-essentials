import { ReadonlyKeys } from "../readonly-keys";
import { Writable } from "../writable";

export type MarkReadonly<Type, Keys extends keyof Type> = Type extends Type
  ? Readonly<Type> & Writable<Omit<Type, Keys | ReadonlyKeys<Type & object>>>
  : never;
