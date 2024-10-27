import { ReadonlyKeys } from "../readonly-keys";

export type WritableKeys<Type extends {}> = Type extends unknown ? Exclude<keyof Type, ReadonlyKeys<Type>> : never;
