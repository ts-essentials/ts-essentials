import { AnyArray } from "../any-array";
import { Builtin } from "../built-in";
import { IsNever } from "../is-never";

type Pathable = string | bigint | number;

type UnsafeValue<Type, Key> = Key extends keyof Type ? Type[Key] : never;

// Prevent inference of non-recursive type methods, e.g. Promise.then or Array.entries
type NonRecursiveType = Builtin | Promise<unknown> | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>;

type Stringify<T> = T extends Pathable ? `${T}` : never;

// Convert numeric indices to bigint to prevent unintentional float indices
type StrictIndex<Key extends Pathable> = Key extends number ? bigint : Key;

// Caching `RecursivePaths = Paths<UnsafeValue<Type, Key>>` to prevent double calculation
type RecursivePaths<
  Type,
  Key extends Pathable,
  RecursivePaths = Paths<UnsafeValue<Type, Key>>,
> = IsNever<RecursivePaths> extends false ? `${StrictIndex<Key>}.${Stringify<RecursivePaths>}` : never;

type UnsafePaths<Type> = Type extends readonly []
  ? never
  : {
      [Key in keyof Type]: Key extends Pathable
        ? StrictIndex<Key> | `${StrictIndex<Key>}` | RecursivePaths<Type, Key>
        : never;
    }[Type extends AnyArray
      ? // only numeric keys are acceptable for arrays/tuples
        number & keyof Type
      : keyof Type];

type Paths<Type> = Type extends NonRecursiveType
  ? never
  : Type extends AnyArray
  ? UnsafePaths<Type>
  : Type extends object
  ? UnsafePaths<Type>
  : never;

export { Paths };
