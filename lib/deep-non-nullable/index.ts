import { Builtin } from "../built-in";

export type DeepNonNullable<Type> = Type extends Builtin
  ? NonNullable<Type>
  : Type extends Map<infer Keys, infer Values>
  ? Map<DeepNonNullable<Keys>, DeepNonNullable<Values>>
  : Type extends ReadonlyMap<infer Keys, infer Values>
  ? ReadonlyMap<DeepNonNullable<Keys>, DeepNonNullable<Values>>
  : Type extends WeakMap<infer Keys, infer Values>
  ? WeakMap<DeepNonNullable<Keys>, DeepNonNullable<Values>>
  : Type extends Set<infer Values>
  ? Set<DeepNonNullable<Values>>
  : Type extends ReadonlySet<infer Values>
  ? ReadonlySet<DeepNonNullable<Values>>
  : Type extends WeakSet<infer Values>
  ? WeakSet<DeepNonNullable<Values>>
  : Type extends Promise<infer Values>
  ? Promise<DeepNonNullable<Values>>
  : Type extends {}
  ? { [Key in keyof Type]: DeepNonNullable<Type[Key]> }
  : NonNullable<Type>;
