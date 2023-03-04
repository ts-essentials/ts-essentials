// This also probably uses some inconsistencies -- even though it _should_ be the same to just use
// `T, Writable<T>` for generic arguments, it stops working then, always evaluating to `false`.

import { IsEqualConsideringWritability } from "./is-equal-considering-writability";
import { Writable } from "./writable";

// Swapping `Writable` to `Readable` always returns false too, instead of yielding opposite results.
export type IsFullyWritable<Type extends object> = IsEqualConsideringWritability<
  { [Key in keyof Type]: Type[Key] },
  Writable<{ [Key in keyof Type]: Type[Key] }>
>;
