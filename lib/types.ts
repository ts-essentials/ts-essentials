/** Essentials */
export type Primitive = string | number | boolean | undefined | null;

/** Dictionaries related */
export type Dictionary<T, K extends string | number = string> = { [key in K]: T };
export type DictionaryValues<T> = T extends Dictionary<infer U> ? U : never;

/** Like Partial but recursive */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};

/** Like Required but recursive */
export type DeepRequired<T> = T extends Primitive
  ? NonNullable<T>
  : T extends any[]
  ? DeepRequiredArray<NonNullable<T[number]>>
  : T extends {}
  ? { [K in keyof T]-?: DeepRequired<NonNullable<T[K]>> }
  : T;
interface DeepRequiredArray<T> extends Array<DeepRequired<T>> {}

/** Like Readonly but recursive */
export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends any[]
  ? DeepReadonlyArray<T[number]>
  : T extends Function
  ? T
  : DeepReadonlyObject<T>;
type DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

/** Make sure that T is not null or undefined */
export type NonNullable<T> = T & {};

/** Omit given key in object type */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** Easy create opaque types ie. types that are subset of their original types (ex: positive numbers, uppercased string) */
export type Opaque<K, T> = T & { __TYPE__: K };
