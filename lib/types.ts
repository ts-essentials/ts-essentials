import { AnyArray } from "./any-array";
import { IsFullyWritable } from "./is-fully-writable";
import { OptionalKeys } from "./optional-keys";

export type IsNever<T> = [T] extends [never] ? true : false;

export type ArrayOrSingle<T> = T | T[];

export type ReadonlyArrayOrSingle<T> = T | readonly T[];

/** Gets keys of an object which are required */
export type RequiredKeys<T> = T extends unknown ? Exclude<keyof T, OptionalKeys<T>> : never;

export type NonEmptyArray<T> = [T, ...T[]];

/** Easily extract the type of a given array's elements */
export type ElementOf<T extends readonly any[]> = T extends readonly (infer ET)[] ? ET : never;

/** Type constraint for tuple inference */
export type Tuple<T = any> = [T?, ...T[]];

export type Awaited<T> = T extends PromiseLike<infer PT> ? PT : never;

/** Gets keys of an object which are writable */
export type WritableKeys<T extends {}> = {
  [P in keyof T]-?: IsFullyWritable<Pick<T, P>> extends true ? P : never;
}[keyof T];

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
