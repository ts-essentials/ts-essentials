import { AnyRecord } from "../any-record";
import { Builtin } from "../built-in";

export type DeepPick<Type, Filter> = Type extends Builtin
  ? Type
  : Type extends Map<infer Keys, infer Values>
  ? Filter extends Map<Keys, infer FilterValues>
    ? Map<Keys, DeepPick<Values, FilterValues>>
    : Type
  : Type extends ReadonlyMap<infer Keys, infer Values>
  ? Filter extends ReadonlyMap<Keys, infer FilterValues>
    ? ReadonlyMap<Keys, DeepPick<Values, FilterValues>>
    : Type
  : Type extends WeakMap<infer Keys, infer Values>
  ? Filter extends WeakMap<Keys, infer FilterValues>
    ? WeakMap<Keys, DeepPick<Values, FilterValues>>
    : Type
  : Type extends Set<infer Values>
  ? Filter extends Set<infer FilterValues>
    ? Set<DeepPick<Values, FilterValues>>
    : Type
  : Type extends ReadonlySet<infer Values>
  ? Filter extends ReadonlySet<infer FilterValues>
    ? ReadonlySet<DeepPick<Values, FilterValues>>
    : Type
  : Type extends WeakSet<infer Values>
  ? Filter extends WeakSet<infer FilterValues>
    ? WeakSet<DeepPick<Values, FilterValues>>
    : Type
  : Type extends Array<infer Values>
  ? Filter extends Array<infer FilterValues>
    ? Array<DeepPick<Values, FilterValues>>
    : Type
  : Type extends Promise<infer Value>
  ? Filter extends Promise<infer FilterValue>
    ? Promise<DeepPick<Value, FilterValue>>
    : Type
  : Filter extends AnyRecord
  ? {
      // iterate over keys of Type, which keeps the information about keys: optional, required or readonly
      [Key in keyof Type as Key extends keyof Filter ? Key : never]: Filter[Key & keyof Filter] extends true
        ? Type[Key]
        : Key extends keyof Filter
        ? DeepPick<Type[Key], Filter[Key]>
        : never;
    }
  : never;
