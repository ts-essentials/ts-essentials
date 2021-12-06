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
type SeparatorCaseParser<T, Result extends readonly any[] = []> = T extends `${infer Word}${Separator}${infer Tail}`
  ? SeparatorCaseParser<Tail, [...Result, Lowercase<Word>]>
  : T extends `${infer Word}`
  ? [...Result, Lowercase<Word>]
  : Result;

type CamelCaseParser<T, Result extends readonly any[] = []> = T extends ""
  ? Result
  : T extends `${WordInCamelCase<T & string>}${infer Tail}`
  ? T extends `${infer Word}${Tail}`
    ? CamelCaseParser<Uncapitalize<Tail>, [...Result, Lowercase<Word>]>
    : never
  : never;

type PascalCaseParser<T, Result extends readonly any[] = []> = T extends ""
  ? Result
  : T extends `${WordInPascalCase<T & string>}${infer Tail}`
  ? T extends `${infer Word}${Tail}`
    ? PascalCaseParser<Tail, [...Result, Lowercase<Word>]>
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

type PascalCapitalizer<T, Result extends readonly any[] = []> = T extends [infer Head, ...infer Tail]
  ? Head extends string
    ? PascalCapitalizer<Tail, [...Result, Capitalize<Head>]>
    : PascalCapitalizer<Tail, Result>
  : Result;

type CamelCapitalizer<T> = T extends [infer First, ...infer Tail] ? PascalCapitalizer<Tail, [First]> : [];

type Join<T, Result extends string = ""> = T extends [infer Head, ...infer Tail]
  ? Head extends string
    ? Join<Tail, `${Result}${Head}`>
    : Join<Tail>
  : Result;

export type CamelCase<T> = IsStringLiteral<T> extends true ? Join<CamelCapitalizer<SplitAnyCase<T>>> : T;

export type DeepCamelCaseProperties<T> = T extends Record<string, unknown>
  ? { [K in keyof T as CamelCase<K>]: DeepCamelCaseProperties<T[K]> }
  : T;
