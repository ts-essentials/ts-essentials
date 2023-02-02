import { Builtin } from "./built-in";
import { IsTuple } from "./is-tuple";

/** Recursive nullable */
export type DeepNullable<Type> = Type extends Builtin
  ? Type | null
  : Type extends Map<infer Keys, infer Values>
  ? Map<DeepNullable<Keys>, DeepNullable<Values>>
  : Type extends ReadonlyMap<infer Keys, infer Values>
  ? ReadonlyMap<DeepNullable<Keys>, DeepNullable<Values>>
  : Type extends WeakMap<infer Keys, infer Values>
  ? WeakMap<DeepNullable<Keys>, DeepNullable<Values>>
  : Type extends Set<infer Values>
  ? Set<DeepNullable<Values>>
  : Type extends ReadonlySet<infer Values>
  ? ReadonlySet<DeepNullable<Values>>
  : Type extends WeakSet<infer Values>
  ? WeakSet<DeepNullable<Values>>
  : Type extends Array<infer Values>
  ? Type extends IsTuple<Type>
    ? { [Key in keyof Type]: DeepNullable<Type[Key]> | null }
    : Array<DeepNullable<Values>>
  : Type extends Promise<infer Value>
  ? Promise<DeepNullable<Value>>
  : Type extends {}
  ? { [Key in keyof Type]: DeepNullable<Type[Key]> }
  : Type | null;
