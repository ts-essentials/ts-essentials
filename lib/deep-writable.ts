import { Builtin } from "./built-in";

/** Like Writable but recursive */
export type DeepWritable<Type> = Type extends Builtin
  ? Type
  : Type extends Map<infer Key, infer Value>
  ? Map<DeepWritable<Key>, DeepWritable<Value>>
  : Type extends ReadonlyMap<infer Key, infer Value>
  ? Map<DeepWritable<Key>, DeepWritable<Value>>
  : Type extends WeakMap<infer Key, infer Value>
  ? WeakMap<DeepWritable<Key>, DeepWritable<Value>>
  : Type extends Set<infer Values>
  ? Set<DeepWritable<Values>>
  : Type extends ReadonlySet<infer Values>
  ? Set<DeepWritable<Values>>
  : Type extends WeakSet<infer Values>
  ? WeakSet<DeepWritable<Values>>
  : Type extends Promise<infer Value>
  ? Promise<DeepWritable<Value>>
  : Type extends {}
  ? { -readonly [Key in keyof Type]: DeepWritable<Type[Key]> }
  : Type;
