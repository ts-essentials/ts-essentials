/**
 * Basic interface for guarded functions that use [predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
 */
export type PredicateFunction = (x: any, ..._z: any[]) => x is any;

/**
 * Extracts the [predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) of a guarded function
 */
export type PredicateType<T extends PredicateFunction> = T extends (target: any, ...rest: any[]) => target is infer P
  ? P
  : never;
