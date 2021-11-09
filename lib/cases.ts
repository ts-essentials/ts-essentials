type SplitSnakeCase<T> = T extends `${infer Word}_${infer Tail}`
  ? [Word, ...SplitSnakeCase<Tail>]
  : T extends `${infer Word}`
  ? [Word]
  : [];

type PascalCapitalizer<T> = T extends [infer Head, ...infer Tail]
  ? Head extends string
    ? [Capitalize<Head>, ...PascalCapitalizer<Tail>]
    : PascalCapitalizer<Tail>
  : [];

type CamelCapitalizer<T extends string[]> = T extends [infer First, ...infer Tail]
  ? [First, ...PascalCapitalizer<Tail>]
  : [];

type Join<T> = T extends [infer Head, ...infer Tail] ? (Head extends string ? `${Head}${Join<Tail>}` : Join<Tail>) : "";

export type CamelCase<T> = Join<CamelCapitalizer<SplitSnakeCase<T>>>;

export type CamelCaseProperties<T> = T extends Record<string, unknown> ? { [K in keyof T as CamelCase<K>]: T[K] } : T;
