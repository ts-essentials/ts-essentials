import { AnyRecord } from "../any-record";
import { Builtin } from "../built-in";
import { DeepModify } from "../deep-modify";

export type DeepPick<Type, Filter extends DeepModify<Type>> = Type extends Builtin
  ? Type
  : Type extends Map<infer Keys, infer Values>
  ? Filter extends Map<Keys, infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? Map<Keys, DeepPick<Values, FilterValues>>
      : Type
    : Type
  : Type extends ReadonlyMap<infer Keys, infer Values>
  ? Filter extends ReadonlyMap<Keys, infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? ReadonlyMap<Keys, DeepPick<Values, FilterValues>>
      : Type
    : Type
  : Type extends WeakMap<infer Keys, infer Values>
  ? Filter extends WeakMap<Keys, infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? WeakMap<Keys, DeepPick<Values, FilterValues>>
      : Type
    : Type
  : Type extends Set<infer Values>
  ? Filter extends Set<infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? Set<DeepPick<Values, FilterValues>>
      : Type
    : Type
  : Type extends ReadonlySet<infer Values>
  ? Filter extends ReadonlySet<infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? ReadonlySet<DeepPick<Values, FilterValues>>
      : Type
    : Type
  : Type extends WeakSet<infer Values>
  ? Filter extends WeakSet<infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? WeakSet<DeepPick<Values, FilterValues>>
      : Type
    : Type
  : Type extends Array<infer Values>
  ? Filter extends Array<infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? Array<DeepPick<Values, FilterValues>>
      : Type
    : Type
  : Type extends Promise<infer Value>
  ? Filter extends Promise<infer FilterValue>
    ? FilterValue extends DeepModify<Value>
      ? Promise<DeepPick<Value, FilterValue>>
      : Type
    : Type
  : Filter extends AnyRecord
  ? {
      // iterate over keys of Type, which keeps the information about keys: optional, required or readonly
      [Key in keyof Type as Key extends keyof Filter ? Key : never]: Filter[Key & keyof Filter] extends true
        ? Type[Key]
        : Key extends keyof Filter
        ? Filter[Key] extends DeepModify<Type[Key]>
          ? DeepPick<Type[Key], Filter[Key]>
          : never
        : never;
    }
  : never;
