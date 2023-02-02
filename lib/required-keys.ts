import { OptionalKeys } from "./optional-keys";

/** Gets keys of an object which are required */
export type RequiredKeys<Type> = Type extends unknown ? Exclude<keyof Type, OptionalKeys<Type>> : never;
