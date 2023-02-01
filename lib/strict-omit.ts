import { AnyArray } from "./any-array";
import { AnyRecord } from "./any-record";

/** Similar to the builtin Omit, but checks the filter strictly. */
export type StrictOmit<Type extends AnyRecord, Keys extends keyof Type> = Type extends AnyArray
  ? never
  : Omit<Type, Keys>;
