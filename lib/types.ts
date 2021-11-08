/** Essentials */
export type Primitive = string | number | boolean | bigint | symbol | undefined | null;
export type Builtin = Primitive | Function | Date | Error | RegExp;
export type IsTuple<T> = T extends any[] ? (any[] extends T ? never : T) : never;
type AnyRecord<T = any> = Record<PropertyKey, T>;
// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<T> = 0 extends 1 & T ? true : false;
export type IsNever<T> = [T] extends [never] ? true : false;
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;
export type AnyArray<T = any> = Array<T> | ReadonlyArray<T>;

export type ArrayOrSingle<T> = T | T[];

type NonUndefinable<T> = T extends undefined ? never : T;

/**
 * Like Record, but can be used with only one argument.
 * Useful, if you want to make sure that all of the keys of a finite type are used.
 */
export type Dictionary<T, K extends string | number = string> = { [key in K]: T };
/** Given Dictionary<T> returns T */
export type DictionaryValues<T> = T[keyof T];
/**
 * Like Dictionary, but:
 *  - ensures type safety of index access
 *  - does not enforce key exhaustiveness
 */
export type SafeDictionary<T, K extends string | number = string> = { [key in K]?: T };

/** Like Partial but recursive */
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? Map<DeepPartial<K>, DeepPartial<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepPartial<K>, DeepPartial<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepPartial<K>, DeepPartial<V>>
  : T extends Set<infer U>
  ? Set<DeepPartial<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepPartial<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepPartial<U>>
  : T extends Array<infer U>
  ? T extends IsTuple<T>
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : Array<DeepPartial<U>>
  : T extends Promise<infer U>
  ? Promise<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : IsUnknown<T> extends true
  ? unknown
  : Partial<T>;

/** Recursive nullable */
export type DeepNullable<T> = T extends Builtin
  ? T | null
  : T extends Map<infer K, infer V>
  ? Map<DeepNullable<K>, DeepNullable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepNullable<K>, DeepNullable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepNullable<K>, DeepNullable<V>>
  : T extends Set<infer U>
  ? Set<DeepNullable<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepNullable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepNullable<U>>
  : T extends Array<infer U>
  ? T extends IsTuple<T>
    ? { [K in keyof T]: DeepNullable<T[K]> | null }
    : Array<DeepNullable<U>>
  : T extends Promise<infer U>
  ? Promise<DeepNullable<U>>
  : T extends {}
  ? { [K in keyof T]: DeepNullable<T[K]> }
  : T | null;

/** Recursive undefinable */
export type DeepUndefinable<T> = T extends Builtin
  ? T | undefined
  : T extends Map<infer K, infer V>
  ? Map<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepUndefinable<K>, DeepUndefinable<V>>
  : T extends Set<infer U>
  ? Set<DeepUndefinable<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepUndefinable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepUndefinable<U>>
  : T extends Array<infer U>
  ? T extends IsTuple<T>
    ? { [K in keyof T]: DeepUndefinable<T[K]> | undefined }
    : Array<DeepUndefinable<U>>
  : T extends Promise<infer U>
  ? Promise<DeepUndefinable<U>>
  : T extends {}
  ? { [K in keyof T]: DeepUndefinable<T[K]> }
  : T | undefined;

/** Like NonNullable but recursive */
export type DeepNonNullable<T> = T extends Builtin
  ? NonNullable<T>
  : T extends Map<infer K, infer V>
  ? Map<DeepNonNullable<K>, DeepNonNullable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepNonNullable<K>, DeepNonNullable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepNonNullable<K>, DeepNonNullable<V>>
  : T extends Set<infer U>
  ? Set<DeepNonNullable<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepNonNullable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepNonNullable<U>>
  : T extends Promise<infer U>
  ? Promise<DeepNonNullable<U>>
  : T extends {}
  ? { [K in keyof T]: DeepNonNullable<T[K]> }
  : NonNullable<T>;

/** Like Required but recursive */
export type DeepRequired<T> = T extends Error
  ? Required<T>
  : T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? Map<DeepRequired<K>, DeepRequired<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepRequired<K>, DeepRequired<V>>
  : T extends Set<infer U>
  ? Set<DeepRequired<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepRequired<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepRequired<U>>
  : T extends Promise<infer U>
  ? Promise<DeepRequired<U>>
  : T extends {}
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : Required<T>;

/** Like Readonly but recursive */
export type DeepReadonly<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends {}
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : IsUnknown<T> extends true
  ? unknown
  : Readonly<T>;

/** Make readonly object writable */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };

/** Like Writable but recursive */
export type DeepWritable<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? Map<DeepWritable<K>, DeepWritable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? Map<DeepWritable<K>, DeepWritable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepWritable<K>, DeepWritable<V>>
  : T extends Set<infer U>
  ? Set<DeepWritable<U>>
  : T extends ReadonlySet<infer U>
  ? Set<DeepWritable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepWritable<U>>
  : T extends Promise<infer U>
  ? Promise<DeepWritable<U>>
  : T extends {}
  ? { -readonly [K in keyof T]: DeepWritable<T[K]> }
  : T;

/** Combination of DeepPartial and DeepWritable */
export type Buildable<T> = DeepPartial<DeepWritable<T>>;

/** Similar to the builtin Omit, but checks the filter strictly. */
export type StrictOmit<T extends AnyRecord, K extends keyof T> = T extends AnyArray ? never : Omit<T, K>;

/** Similar to the builtin Extract, but checks the filter strictly */
export type StrictExtract<T, U extends Partial<T>> = Extract<T, U>;

type PickKeysByValue<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

/** Omit all properties of given type in object type */
export type OmitProperties<T, P> = Omit<T, PickKeysByValue<T, P>>;

/** Pick all properties of given type in object type */
export type PickProperties<T, P> = Pick<T, PickKeysByValue<T, P>>;

/** Gets keys of an object which are optional */
export type OptionalKeys<T> = T extends unknown
  ? {
      [K in keyof T]-?: undefined extends { [K2 in keyof T]: K2 }[K] ? K : never;
    }[keyof T]
  : never;

/** Gets keys of an object which are required */
export type RequiredKeys<T> = T extends unknown ? Exclude<keyof T, OptionalKeys<T>> : never;

/** Gets keys of properties of given type in object type */
export type PickKeys<T, P> = Exclude<keyof PickProperties<T, P>, undefined>;

/** Recursively omit deep properties */
export type DeepOmit<T, Filter extends DeepModify<T>> = T extends Builtin
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? Filter extends DeepModify<ValueType>
    ? Map<KeyType, DeepPick<ValueType, Filter>>
    : T
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? Filter extends DeepModify<ValueType>
    ? ReadonlyMap<KeyType, DeepPick<ValueType, Filter>>
    : T
  : T extends WeakMap<infer KeyType, infer ValueType>
  ? Filter extends DeepModify<ValueType>
    ? WeakMap<KeyType, DeepPick<ValueType, Filter>>
    : T
  : T extends Set<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? Set<DeepPick<ItemType, Filter>>
    : T
  : T extends ReadonlySet<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? ReadonlySet<DeepPick<ItemType, Filter>>
    : T
  : T extends WeakSet<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? WeakSet<DeepPick<ItemType, Filter>>
    : T
  : T extends Array<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? Array<DeepPick<ItemType, Filter>>
    : T
  : T extends Promise<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? Promise<DeepPick<ItemType, Filter>>
    : T
  : Filter extends Record<string, unknown>
  ? { [K in Exclude<OptionalKeys<T>, keyof Filter>]+?: T[K] } & OmitProperties<
      {
        [K in Extract<OptionalKeys<T>, keyof Filter>]+?: Filter[K] extends true
          ? never
          : Filter[K] extends DeepModify<T[K]>
          ? DeepOmit<T[K], Filter[K]>
          : T[K];
      },
      never
    > & { [K in Exclude<RequiredKeys<T>, keyof Filter>]: T[K] } & OmitProperties<
        {
          [K in Extract<RequiredKeys<T>, keyof Filter>]: Filter[K] extends true
            ? never
            : Filter[K] extends DeepModify<T[K]>
            ? DeepOmit<T[K], Filter[K]>
            : T[K];
        },
        never
      >
  : never;

/** Recursively pick deep properties */
export type DeepPick<T, Filter extends DeepModify<T>> = T extends Builtin
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? Filter extends DeepModify<ValueType>
    ? Map<KeyType, DeepPick<ValueType, Filter>>
    : T
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? Filter extends DeepModify<ValueType>
    ? ReadonlyMap<KeyType, DeepPick<ValueType, Filter>>
    : T
  : T extends WeakMap<infer KeyType, infer ValueType>
  ? Filter extends DeepModify<ValueType>
    ? WeakMap<KeyType, DeepPick<ValueType, Filter>>
    : T
  : T extends Set<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? Set<DeepPick<ItemType, Filter>>
    : T
  : T extends ReadonlySet<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? ReadonlySet<DeepPick<ItemType, Filter>>
    : T
  : T extends WeakSet<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? WeakSet<DeepPick<ItemType, Filter>>
    : T
  : T extends Array<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? Array<DeepPick<ItemType, Filter>>
    : T
  : T extends Promise<infer ItemType>
  ? Filter extends DeepModify<ItemType>
    ? Promise<DeepPick<ItemType, Filter>>
    : T
  : Filter extends Record<string, unknown>
  ? {
      // iterate over keys of T, which keeps the information about keys: optional, required or readonly
      [K in keyof T as K extends keyof Filter ? K : never]: Filter[K & keyof Filter] extends true
        ? T[K & keyof T]
        : DeepPick<T[K & keyof T], Filter[K & keyof Filter]>;
    }
  : never;

type DeepModify<T> =
  | {
      [K in keyof T]?: undefined extends { [K2 in keyof T]: K2 }[K]
        ? NonUndefinable<T[K]> extends object
          ? true | DeepModify<NonUndefinable<T[K]>>
          : true
        : T[K] extends object
        ? true | DeepModify<T[K]>
        : true;
    }
  | Array<DeepModify<T>>
  | Promise<DeepModify<T>>
  | Set<DeepModify<T>>
  | ReadonlySet<DeepModify<T>>
  | WeakSet<DeepModify<T>>
  | Map<any, DeepModify<T>>
  | WeakMap<any, DeepModify<T>>;

/** Remove keys with `never` value from object type */
export type NonNever<T extends {}> = Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;

export type NonEmptyObject<T extends {}> = keyof T extends never ? never : T;

/** Merge 2 types, properties types from the latter override the ones defined on the former type */
export type Merge<M, N> = Omit<M, keyof N> & N;

type _MergeN<T extends readonly any[], Result> = T extends readonly [infer Head, ...infer Tail]
  ? _MergeN<Tail, Merge<Result, Head>>
  : Result;

/** Merge N types, properties types from the latter override the ones defined on the former type */
export type MergeN<T extends readonly any[]> = _MergeN<T, {}>;

/** Mark some properties as required, leaving others unchanged */
export type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> & Required<Pick<T, RK>>;

/** Mark some properties as optional, leaving others unchanged */
export type MarkOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Convert union type to intersection #darkmagic */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never;

declare const __OPAQUE_TYPE__: unique symbol;

/** Easily create opaque types ie. types that are subset of their original types (ex: positive numbers, uppercased string) */
export type Opaque<Type, Token extends string> = Token extends StringLiteral<Token>
  ? Type & { readonly [__OPAQUE_TYPE__]: Token }
  : never;

/** Easily extract the type of a given object's values */
export type ValueOf<T> = T[keyof T];

/** Easily extract the type of a given array's elements */
export type ElementOf<T extends readonly any[]> = T extends readonly (infer ET)[] ? ET : never;

/** Type constraint for tuple inference */
export type Tuple<T = any> = [T] | T[];

/** Useful as a return type in interfaces or abstract classes with missing implementation */
export type AsyncOrSync<T> = PromiseLike<T> | T;

export type Awaited<T> = T extends PromiseLike<infer PT> ? PT : never;
export type AsyncOrSyncType<T> = T extends AsyncOrSync<infer PT> ? PT : never;

export interface Newable<T> {
  new (...args: any[]): T;
}

// A helper for `ReadonlyKeys` & `WritableKeys`
// This potentially abuses compiler some inconsistencies in checking type equality for generics,
// because normally `readonly` doesn't affect whether types are assignable.
// @see https://stackoverflow.com/a/52473108/1815209 with comments
type IsEqualConsideringWritability<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
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

/** Mark some properties which only the former including as optional and set the value to never */
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/** get the XOR type which could make 2 types exclude each other */
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

/** Functional programming essentials */
export type Head<T extends AnyArray> = T["length"] extends 0 ? never : T[0];
export type Tail<T extends AnyArray> = T["length"] extends 0
  ? never
  : ((...t: T) => void) extends (first: any, ...rest: infer Rest) => void
  ? Rest
  : never;

export type Exact<T, SHAPE> = T extends SHAPE ? (Exclude<keyof T, keyof SHAPE> extends never ? T : never) : never;
