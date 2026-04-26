import { Builtin } from "../built-in";
import { IsUnknown } from "../is-unknown";

type DeepWritableObject<Type> = {
  -readonly [Key in keyof Type]: Key extends typeof Symbol.iterator
    ? Type[Key] extends () => Iterator<infer IteratorType, infer Return, infer Next>
      ? () => Iterator<DeepWritable<IteratorType>, DeepWritable<Return>, DeepWritable<Next>>
      : DeepWritable<Type[Key]>
    : DeepWritable<Type[Key]>;
};

export type DeepWritable<Type> = Type extends Exclude<Builtin, Error>
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
  ? DeepWritableObject<Type>
  : IsUnknown<Type> extends true
  ? unknown
  : Type;
