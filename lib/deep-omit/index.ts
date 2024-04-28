import { AnyRecord } from "../any-record";
import { Builtin } from "../built-in";

export type DeepOmit<Type, Filter> = Type extends Builtin
  ? Type
  : Type extends Map<infer Keys, infer Values>
  ? Filter extends Map<Keys, infer FilterValues>
    ? Map<Keys, DeepOmit<Values, FilterValues>>
    : Type
  : Type extends ReadonlyMap<infer Keys, infer Values>
  ? Filter extends ReadonlyMap<Keys, infer FilterValues>
    ? ReadonlyMap<Keys, DeepOmit<Values, FilterValues>>
    : Type
  : Type extends WeakMap<infer Keys, infer Values>
  ? Filter extends WeakMap<Keys, infer FilterValues>
    ? WeakMap<Keys, DeepOmit<Values, FilterValues>>
    : Type
  : Type extends Set<infer Values>
  ? Filter extends Set<infer FilterValues>
    ? Set<DeepOmit<Values, FilterValues>>
    : Type
  : Type extends ReadonlySet<infer Values>
  ? Filter extends ReadonlySet<infer FilterValues>
    ? ReadonlySet<DeepOmit<Values, FilterValues>>
    : Type
  : Type extends WeakSet<infer Values>
  ? Filter extends WeakSet<infer FilterValues>
    ? WeakSet<DeepOmit<Values, FilterValues>>
    : Type
  : Type extends Array<infer Values>
  ? Filter extends Array<infer FilterValues>
    ? Array<DeepOmit<Values, FilterValues>>
    : Type
  : Type extends Promise<infer Value>
  ? Filter extends Promise<infer FilterValue>
    ? Promise<DeepOmit<Value, FilterValue>>
    : Type
  : Filter extends AnyRecord
  ? {
      [Key in keyof Type as Key extends keyof Filter
        ? Filter[Key] extends true
          ? never
          : Key
        : Key]: Key extends keyof Filter ? DeepOmit<Type[Key], Filter[Key]> : Type[Key];
    }
  : never;
