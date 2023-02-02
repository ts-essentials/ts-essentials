import { AnyArray } from "./any-array";

export type ArrayOrSingle<T> = T | T[];

export type ReadonlyArrayOrSingle<T> = T | readonly T[];

export type NonEmptyArray<T> = [T, ...T[]];

/** Easily extract the type of a given array's elements */
export type ElementOf<T extends readonly any[]> = T extends readonly (infer ET)[] ? ET : never;

/** Type constraint for tuple inference */
export type Tuple<T = any> = [T?, ...T[]];

export type Awaited<T> = T extends PromiseLike<infer PT> ? PT : never;

/** Functional programming essentials */
export type Head<T extends AnyArray> = T["length"] extends 0 ? never : T[0];
export type Tail<T extends AnyArray> = T extends [any, ...infer Rest] ? Rest : never;

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
