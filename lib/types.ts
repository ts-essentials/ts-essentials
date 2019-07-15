/** Essentials */
export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

/**
 * Construct a type with the properties of T except for those in type K.
 * Use this instead of TS 3.5 Omit to keep it backwards compatible.
 */
type _Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/** Dictionaries related */
export type Dictionary<T, K extends string | number = string> = { [key in K]: T };
export type DictionaryValues<T> = T extends Dictionary<infer U> ? U : never;

/** Like Partial but recursive */
export type DeepPartial<T> = T extends Primitive
  ? T
  : T extends Function
  ? T
  : T extends Date
  ? T
  : T extends Map<infer K, infer V>
  ? DeepPartialMap<K, V>
  : T extends Set<infer U>
  ? DeepPartialSet<U>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
interface DeepPartialSet<ItemType> extends Set<DeepPartial<ItemType>> {}
interface DeepPartialMap<KeyType, ValueType> extends Map<DeepPartial<KeyType>, DeepPartial<ValueType>> {}

/** Like NonNullable but recursive */
export type DeepNonNullable<T> = T extends Primitive
  ? NonNullable<T>
  : T extends Function
  ? NonNullable<T>
  : T extends Date
  ? NonNullable<T>
  : T extends Map<infer K, infer V>
  ? NonNullableMap<K, V>
  : T extends Set<infer U>
  ? NonNullableSet<U>
  : T extends {}
  ? { [K in keyof T]: DeepNonNullable<T[K]> }
  : NonNullable<T>;
interface NonNullableSet<ItemType> extends Set<DeepNonNullable<ItemType>> {}
interface NonNullableMap<KeyType, ValueType> extends Map<DeepNonNullable<KeyType>, DeepNonNullable<ValueType>> {}

/** Like Required but recursive */
export type DeepRequired<T> = T extends Primitive
  ? NonNullable<T>
  : T extends Function
  ? NonNullable<T>
  : T extends Date
  ? NonNullable<T>
  : T extends Map<infer K, infer V>
  ? RequiredMap<K, V>
  : T extends Set<infer U>
  ? RequiredSet<U>
  : T extends {}
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : NonNullable<T>;
interface RequiredSet<ItemType> extends Set<DeepRequired<ItemType>> {}
interface RequiredMap<KeyType, ValueType> extends Map<DeepRequired<KeyType>, DeepRequired<ValueType>> {}

/** Like Readonly but recursive */
export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Function
  ? T
  : T extends Date
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<K, V>
  : T extends Set<infer U>
  ? ReadonlySet<U>
  : T extends {}
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : Readonly<T>;
interface ReadonlySet<ItemType> extends Set<DeepReadonly<ItemType>> {}
interface ReadonlyMap<KeyType, ValueType> extends Map<DeepReadonly<KeyType>, DeepReadonly<ValueType>> {}

/** Make readonly object writable */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };

/** Like Writable but recursive */
export type DeepWritable<T> = T extends Primitive
  ? T
  : T extends Function
  ? T
  : T extends Date
  ? T
  : T extends Map<infer K, infer V>
  ? WritableMap<K, V>
  : T extends Set<infer U>
  ? WritableSet<U>
  : T extends {}
  ? { -readonly [K in keyof T]: DeepWritable<T[K]> }
  : T;
interface WritableSet<ItemType> extends Set<DeepWritable<ItemType>> {}
interface WritableMap<KeyType, ValueType> extends Map<DeepWritable<KeyType>, DeepReadonly<ValueType>> {}

/** Similar to the builtin Omit, but checks the filter strictly. */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** Omit all properties of given type in object type */
export type OmitProperties<T, P> = Pick<T, { [K in keyof T]: T[K] extends P ? never : K }[keyof T]>;

/** Recursively omit deep properties */
export type DeepOmit<T extends DeepOmitModify<Filter>, Filter> = T extends Primitive | Function | Date
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? ValueType extends DeepOmitModify<Filter>
    ? DeepOmitMap<KeyType, ValueType, Filter>
    : T
  : T extends Set<infer ItemType>
  ? ItemType extends DeepOmitModify<Filter>
    ? DeepOmitSet<ItemType, Filter>
    : T
  : T extends Array<infer ItemType>
  ? ItemType extends DeepOmitModify<Filter>
    ? DeepOmitArray<ItemType, Filter>
    : T
  : { [K in Exclude<keyof T, keyof Filter>]: T[K] } &
      OmitProperties<
        {
          [K in Extract<keyof T, keyof Filter>]: Filter[K] extends true
            ? never
            : T[K] extends DeepOmitModify<Filter[K]>
            ? DeepOmit<T[K], Filter[K]>
            : T[K];
        },
        never
      >;
type DeepOmitSuper<T> = {
  [K in keyof T]: T[K] extends never ? any : T[K] extends object ? DeepOmitModify<T[K]> : never;
};
type DeepOmitModify<T> = DeepOmitSuper<T> | DeepOmitModifyArray<T> | DeepOmitModifySet<T> | DeepOmitModifyMap<T>;
interface DeepOmitModifyArray<ItemType> extends Array<DeepOmitModify<ItemType>> {}
interface DeepOmitModifySet<ItemType> extends Set<DeepOmitModify<ItemType>> {}
interface DeepOmitModifyMap<ValueType> extends Map<any, DeepOmitModify<ValueType>> {}
interface DeepOmitArray<ItemType extends DeepOmitModify<Filter>, Filter> extends Array<DeepOmit<ItemType, Filter>> {}
interface DeepOmitSet<ItemType extends DeepOmitModify<Filter>, Filter> extends Set<DeepOmit<ItemType, Filter>> {}
interface DeepOmitMap<KeyType, ValueType extends DeepOmitModify<Filter>, Filter>
  extends Map<KeyType, DeepOmit<ValueType, Filter>> {}

/** Remove keys with `never` value from object type */
export type NonNever<T extends {}> = Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;

/** Merge 2 types, properties types from the latter override the ones defined on the former type */
export type Merge<M, N> = _Omit<M, Extract<keyof M, keyof N>> & N;

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
