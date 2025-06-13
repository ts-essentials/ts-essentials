import { Builtin } from "../built-in";
import { IsNever } from "../is-never";
import { IsTuple } from "../is-tuple";

export type DeepNullable<Type> = IsNever<Type> extends true
  ? null
  : Type extends Builtin
  ? Type | null
  : Type extends Map<infer Keys, infer Values>
  ? Map<DeepNullable<Keys>, DeepNullable<Values>>
  : Type extends ReadonlyMap<infer Keys, infer Values>
  ? ReadonlyMap<DeepNullable<Keys>, DeepNullable<Values>>
  : Type extends WeakMap<infer Keys, infer Values>
  ? // TODO: replace it with WeakKey (introduced at TypeScript@5.2)
    // WeakMap key has to satisfy WeakKey which is object at the moment
    DeepNullable<Keys> extends object
    ? WeakMap<DeepNullable<Keys>, DeepNullable<Values>>
    : never
  : Type extends Set<infer Values>
  ? Set<DeepNullable<Values>>
  : Type extends ReadonlySet<infer Values>
  ? ReadonlySet<DeepNullable<Values>>
  : Type extends WeakSet<infer Values>
  ? // TODO: replace it with WeakKey (introduced at TypeScript@5.2)
    // WeakSet key has to satisfy WeakKey which is object at the moment
    DeepNullable<Values> extends object
    ? WeakSet<DeepNullable<Values>>
    : never
  : Type extends ReadonlyArray<infer Values>
  ? Type extends IsTuple<Type>
    ? { [Key in keyof Type]: DeepNullable<Type[Key]> | null }
    : Type extends Array<Values>
    ? Array<DeepNullable<Values>>
    : ReadonlyArray<DeepNullable<Values>>
  : Type extends Promise<infer Value>
  ? Promise<DeepNullable<Value>>
  : Type extends {}
  ? { [Key in keyof Type]: DeepNullable<Type[Key]> }
  : Type | null;
