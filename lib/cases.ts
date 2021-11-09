type IsStringLiteral<T> = T extends string ? (string extends T ? false : true) : false;

type WordInPascalCase<T> = Capitalize<WordInCamelCase<Uncapitalize<T & string>>>;

type WordInCamelCase<T, Ch extends string = ""> = T extends `${Ch}${infer NextCh}${infer _}`
  ? NextCh extends Capitalize<NextCh>
    ? Ch
    : WordInCamelCase<T, `${Ch}${NextCh}`>
  : Ch;

type Separator = "_" | "-";

type IncludesSeparator<T> = T extends `${string}${Separator}${string}` ? true : false;

type IsOneWord<T> = T extends Lowercase<T & string> ? true : T extends Uppercase<T & string> ? true : false;

type IsCamelCase<T> = T extends Uncapitalize<T & string> ? true : false;

type IsPascalCase<T> = T extends Capitalize<T & string> ? true : false;

/** snake_case, CONSTANT_CASE, kebab-case or COBOL-CASE */
type SeparatorCaseParser<T> = T extends `${infer Word}${Separator}${infer Tail}`
  ? [Lowercase<Word>, ...SeparatorCaseParser<Tail>]
  : T extends `${infer Word}`
  ? [Lowercase<Word>]
  : [];

type CamelCaseParser<T> = T extends ""
  ? []
  : T extends `${WordInCamelCase<T & string>}${infer Tail}`
  ? T extends `${infer Word}${Tail}`
    ? [Lowercase<Word>, ...CamelCaseParser<Uncapitalize<Tail>>]
    : never
  : never;

type PascalCaseParser<T> = T extends ""
  ? []
  : T extends `${WordInPascalCase<T & string>}${infer Tail}`
  ? T extends `${infer Word}${Tail}`
    ? [Lowercase<Word>, ...PascalCaseParser<Tail>]
    : never
  : never;

type SplitAnyCase<T> = IncludesSeparator<T> extends true
  ? SeparatorCaseParser<T>
  : IsOneWord<T> extends true
  ? [Lowercase<T & string>]
  : IsCamelCase<T> extends true
  ? CamelCaseParser<T>
  : IsPascalCase<T> extends true
  ? PascalCaseParser<T>
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

export type CamelCase<T> = IsStringLiteral<T> extends true ? Join<CamelCapitalizer<SplitAnyCase<T>>> : T;

export type DeepCamelCaseProperties<T> = T extends Record<string, unknown>
  ? { [K in keyof T as CamelCase<K>]: DeepCamelCaseProperties<T[K]> }
  : T;
