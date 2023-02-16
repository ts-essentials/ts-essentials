import { AnyRecord } from "../any-record";
import { Builtin } from "../built-in";
import { DeepModify } from "../deep-modify";

export type DeepOmit<Type, Filter extends DeepModify<Type>> = Type extends Builtin
  ? Type
  : Type extends Map<infer Keys, infer Values>
  ? Filter extends Map<Keys, infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? Map<Keys, DeepOmit<Values, FilterValues>>
      : Type
    : Type
  : Type extends ReadonlyMap<infer Keys, infer Values>
  ? Filter extends ReadonlyMap<Keys, infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? ReadonlyMap<Keys, DeepOmit<Values, FilterValues>>
      : Type
    : Type
  : Type extends WeakMap<infer Keys, infer Values>
  ? Filter extends WeakMap<Keys, infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? WeakMap<Keys, DeepOmit<Values, FilterValues>>
      : Type
    : Type
  : Type extends Set<infer Values>
  ? Filter extends Set<infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? Set<DeepOmit<Values, FilterValues>>
      : Type
    : Type
  : Type extends ReadonlySet<infer Values>
  ? Filter extends ReadonlySet<infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? ReadonlySet<DeepOmit<Values, FilterValues>>
      : Type
    : Type
  : Type extends WeakSet<infer Values>
  ? Filter extends WeakSet<infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? WeakSet<DeepOmit<Values, FilterValues>>
      : Type
    : Type
  : Type extends Array<infer Values>
  ? Filter extends Array<infer FilterValues>
    ? FilterValues extends DeepModify<Values>
      ? Array<DeepOmit<Values, FilterValues>>
      : Type
    : Type
  : Type extends Promise<infer Value>
  ? Filter extends Promise<infer FilterValue>
    ? FilterValue extends DeepModify<Value>
      ? Promise<DeepOmit<Value, FilterValue>>
      : Type
    : Type
  : Filter extends AnyRecord
  ? {
      [Key in keyof Type as Key extends keyof Filter
        ? Filter[Key] extends true
          ? never
          : Key
        : Key]: Key extends keyof Filter
        ? Filter[Key] extends DeepModify<Type[Key]>
          ? DeepOmit<Type[Key], Filter[Key]>
          : Type[Key]
        : Type[Key];
    }
  : never;
