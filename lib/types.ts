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
  : T extends (any[] | ReadonlyArray<any>)
  ? DeepReadonlyArray<T[number]>
  : T extends Function
  ? T
  : DeepReadonlyObject<T>;
type DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

/** Make readonly object writable */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };

/** Like Writable but recursive */
export type DeepWritable<T> = T extends Primitive
  ? T
  : T extends (any[] | ReadonlyArray<any>)
  ? WritableArray<T[number]>
  : T extends Function
  ? T
  : DeepWritableObject<T>;
type DeepWritableObject<T> = { -readonly [P in keyof T]: DeepWritable<T[P]> };
interface WritableArray<T> extends Array<DeepWritable<T>> {}

/** Omit given key in object type */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** Omit all properties of given type in object type */
export type OmitProperties<T, P> = Pick<T, { [K in keyof T]: T[K] extends P ? never : K }[keyof T]>;

/** Remove keys with `never` value from object type */
export type NonNever<T extends {}> = Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;

/** Merge 2 types, properties types from the latter override the ones defined on the former type */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

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
export type AsyncOrSync<T> = Promise<T> | T;
