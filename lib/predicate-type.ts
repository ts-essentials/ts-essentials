import { PredicateFunction } from "./predicate-function";

/**
 * Extracts the [predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) of a guarded function
 */
export type PredicateType<Type extends PredicateFunction> = Type extends (
  target: any,
  ...rest: any[]
) => target is infer NarrowedType
  ? NarrowedType
  : never;
