import { Fn } from "../hkt";
import { DeepIteration } from '../hkt/deep-iteration';
import { CreateDeepResolver } from "../hkt/extractors";

// Builtin => Type
// Map => Map
// ReadonlyMap => ReadonlyMap
// WeakMap => WeakMap
// Set => Set
// ReadonlySet => ReadonlySet
// WeakSet => WeakSet
// Tuple => key?: value
// Array<Type> => Array<Type | undefined>
// Promise => Promise
// Object => key?: value
// unknown => unknown
// otherwise => Partial

interface BuiltinResolver extends Fn {
  return: this["arg0"];
}

interface MapResolver extends Fn {
  return: Map<DeepIteration<this["arg0"], DeepResolver>, DeepIteration<this["arg1"], DeepResolver>>;
}

interface ReadonlyMapResolver extends Fn {
  return: ReadonlyMap<DeepIteration<this["arg0"], DeepResolver>, DeepIteration<this["arg1"], DeepResolver>>;
}

interface WeakMapResolver extends Fn {
  return: DeepIteration<this["arg0"], DeepResolver> extends infer Key extends object
    ? WeakMap<Key, DeepIteration<this["arg1"], DeepResolver>>
    : never;
}

interface SetResolver extends Fn {
  return: Set<DeepIteration<this["arg0"], DeepResolver>>;
}

interface ReadonlySetResolver extends Fn {
  return: ReadonlySet<DeepIteration<this["arg0"], DeepResolver>>;
}

interface WeakSetResolver extends Fn {
  return: DeepIteration<this["arg0"], DeepResolver> extends infer Key extends object
    ? WeakSet<Key>
    : never;
}

interface TupleResolver extends Fn {
  return: this["arg0"] extends infer Tuple
    ? { [Key in keyof Tuple]?: DeepIteration<Tuple[Key], DeepResolver> }
    : never;
}

interface ArrayResolver extends Fn {
  return: Array<DeepIteration<this["arg0"], DeepResolver> | undefined>;
}

interface PromiseResolver extends Fn {
  return: Promise<DeepIteration<this["arg0"], DeepResolver>>;
}

interface UnknownResolver extends Fn {
  return: unknown;
}

interface OtherwiseResolver extends Fn {
  return: Partial<this["arg0"]>;
}

type DeepResolver = CreateDeepResolver<{
  builtin: BuiltinResolver;
  map: MapResolver;
  readonlyMap: ReadonlyMapResolver;
  weakMap: WeakMapResolver;
  set: SetResolver;
  readonlySet: ReadonlySetResolver;
  weakSet: WeakSetResolver;
  tuple: TupleResolver;
  array: ArrayResolver;
  promise: PromiseResolver;
  unknown: UnknownResolver;
  otherwise: OtherwiseResolver;
}>;

export type DeepPartial<Type> = DeepIteration<Type, DeepResolver>;
