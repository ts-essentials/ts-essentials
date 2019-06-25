/** Essentials */
export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

/** Dictionaries related */
export type Dictionary<T, K extends string | number = string> = { [key in K]: T };
export type DictionaryValues<T> = T extends Dictionary<infer U> ? U : never;

type NonNullableSymbol = "NonNullable";
type ReadonlySymbol = "Readonly";
type WritableSymbol = "Writable";
type RequiredSymbol = "Required";
type PartialSymbol = "Partial";

/** Make readonly object writable */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };

type DeepGeneric<P, T> = T extends Primitive | Function | Date
  ? P extends NonNullableSymbol | RequiredSymbol
    ? NonNullable<T>
    : T
  : T extends Map<infer K, infer V>
  ? DeepGenericMap<P, K, V>
  : T extends Set<infer U>
  ? DeepGenericSet<P, U>
  : T extends {}
  ? P extends NonNullableSymbol
    ? { [K in keyof T]: DeepGeneric<P, T[K]> }
    : P extends ReadonlySymbol
    ? { readonly [K in keyof T]: DeepGeneric<P, T[K]> }
    : P extends PartialSymbol
    ? { [K in keyof T]?: DeepGeneric<P, T[K]> }
    : P extends WritableSymbol
    ? { -readonly [K in keyof T]: DeepGeneric<P, T[K]> }
    : P extends RequiredSymbol
    ? { [K in keyof T]-?: DeepGeneric<P, T[K]> }
    : T
  : P extends NonNullableSymbol
  ? NonNullable<T>
  : P extends ReadonlySymbol
  ? Readonly<T>
  : P extends PartialSymbol
  ? Partial<T>
  : P extends WritableSymbol
  ? Writable<T>
  : P extends RequiredSymbol
  ? Required<T>
  : T;
interface DeepGenericSet<P, ItemType> extends Set<DeepGeneric<P, ItemType>> {}
interface DeepGenericMap<P, KeyType, ValueType> extends Map<DeepGeneric<P, KeyType>, DeepGeneric<P, ValueType>> {}

/** Like Partial but recursive */
export type DeepPartial<T> = DeepGeneric<PartialSymbol, T>;

/** Like NonNullable but recursive */
export type DeepNonNullable<T> = DeepGeneric<NonNullableSymbol, T>;

/** Like Required but recursive */
export type DeepRequired<T> = DeepGeneric<RequiredSymbol, T>;

/** Like Readonly but recursive */
export type DeepReadonly<T> = DeepGeneric<ReadonlySymbol, T>;

/** Like Writable but recursive */
export type DeepWritable<T> = DeepGeneric<WritableSymbol, T>;

/**
 * Omit given key in object type
 * @deprecated Starting with TypeScript 3.5, Omit is natively available.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** Omit all properties of given type in object type */
export type OmitProperties<T, P> = Pick<T, { [K in keyof T]: T[K] extends P ? never : K }[keyof T]>;

/** Remove keys with `never` value from object type */
export type NonNever<T extends {}> = Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;

/** Merge 2 types, properties types from the latter override the ones defined on the former type */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

/** Mark some properties as required, leaving others unchanged */
export type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> & Required<Pick<T, RK>>;

/** Convert union type to intersection #darkmagic */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
  ? I
  : never;

/** Easy create opaque types ie. types that are subset of their original types (ex: positive numbers, uppercased string) */
export type Opaque<K, T> = T & { __TYPE__: K };

/** Easily extract the type of a given object's values */
export type ValueOf<T> = T[keyof T];

/** Type constraint for tuple inference */
export type Tuple<T = any> = [T] | T[];

/** Useful as a return type in interfaces or abstract classes with missing implementation */
export type AsyncOrSync<T> = PromiseLike<T> | T;

// A helper for `ReadonlyKeys` & `WritableKeys`
// This potentially abuses compiler some inconsistencies in checking type equality for generics,
// because normally `readonly` doesn't affect whether types are assignable.
// @see https://stackoverflow.com/a/52473108/1815209 with comments
type IsEqualConsideringWritability<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false;

// This also probably uses some inconsistencies -- even though it _should_ be the same to just use
// `T, Writable<T>` for generic arguments, it stops working then, always evaluating to `false`.
// Swapping `Writable` to `Readable` always returns false too, instead of yielding opposite results.
type IsFullyWritable<T extends object> = IsEqualConsideringWritability<
  { [Q in keyof T]: T[Q] },
  Writable<{ [Q in keyof T]: T[Q] }>
>;

/** Gets keys of an object which are readonly */
export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IsFullyWritable<Pick<T, P>> extends true ? never : P;
}[keyof T];

/** Gets keys of an object which are writable */
export type WritableKeys<T extends {}> = {
  [P in keyof T]-?: IsFullyWritable<Pick<T, P>> extends true ? P : never;
}[keyof T];
