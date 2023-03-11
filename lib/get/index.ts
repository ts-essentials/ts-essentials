import { Paths } from "../paths";

type Path<T> = T extends `${infer P}.${infer Rest}` ? [P, ...Path<Rest>] : [T];

type SafeObjectKeyExtractor<O, K> = K extends keyof O
  ? O[K]
  : K extends keyof NonNullable<O>
  ? NonNullable<O>[K] | undefined
  : undefined;

type ArrayElement<A, K extends `${bigint}` | void = void> = K extends keyof A
  ? A[K]
  : A extends readonly (infer T)[]
  ? T | undefined
  : undefined;

// SafeArrayKeyExtractor<{ a: 1; }[], '4'> = { a: 1; } | undefined
type SafeArrayKeyExtractor<A, K> = K extends `${bigint}` ? ArrayElement<A, K> : undefined;

// SafeKeyExtractor<{ a?: 123; }, 'a'> => 123 | undefined
type SafeKeyExtractor<O, K> = O extends readonly any[] | undefined | null
  ? SafeArrayKeyExtractor<O, K>
  : O extends Record<any, any> | undefined | null
  ? SafeObjectKeyExtractor<O, K>
  : undefined;

// GetWithArray<{ a?: { b?: 123; }; }, ['a', 'b']> = 123 | undefined
type GetWithArray<O, K extends readonly any[]> = K extends readonly [infer Head, ...infer Tail]
  ? GetWithArray<SafeKeyExtractor<O, Head>, Tail>
  : K extends readonly [infer Head]
  ? SafeKeyExtractor<O, Head>
  : K extends readonly []
  ? O
  : never;

export type Get<O extends Record<any, any>, T extends Paths<O>> = GetWithArray<O, Path<T>>;
