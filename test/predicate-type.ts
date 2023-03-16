import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { PredicateFunction, PredicateType } from "../lib";

function testPredicateType() {
  type GeneralCases = [
    // simple type guards
    Assert<IsExact<PredicateType<(a: unknown) => a is false>, false>>,
    Assert<IsExact<PredicateType<(a: unknown) => a is true>, true>>,
    Assert<IsExact<PredicateType<(a: unknown) => a is boolean>, boolean>>,
    Assert<IsExact<PredicateType<(a: unknown) => a is any>, any>>,
    Assert<IsExact<PredicateType<(a: unknown) => a is unknown>, unknown>>,
    Assert<IsExact<PredicateType<(a: unknown) => a is [1, 2, 3]>, [1, 2, 3]>>,
    Assert<IsExact<PredicateType<(a: unknown) => a is never>, never>>,
    // simple type guards with complex predicates
    Assert<IsExact<PredicateType<(a: unknown) => a is 1 | 2>, 1 | 2>>,
    Assert<IsExact<PredicateType<(a: { z: string }) => a is typeof a & { y: boolean }>, { z: string; y: boolean }>>,
    // type guard with predicate first and additional arguments
    Assert<IsExact<PredicateType<(a: unknown, _z: any) => a is string[]>, string[]>>,
    // functions without predicate is an error
    // @ts-expect-error
    Assert<IsExact<PredicateType<() => false>, never>>,
    // @ts-expect-error
    Assert<IsExact<PredicateType<() => true>, never>>,
    // @ts-expect-error
    Assert<IsExact<PredicateType<() => boolean>, never>>,
    // Wrong argument format is an error
    // @ts-expect-error
    Assert<IsExact<PredicateType<(thing: unknown, other: unknown) => other is string>, never>>,
    // Assertions are not predicates and will error
    // @ts-expect-error
    Assert<IsExact<PredicateType<(thing: unknown) => asserts thing is false>, never>>,
  ];

  // Chainability tests
  const chainingTestArray = ["some", 1, true, 2, "u"];
  const isArrayOf = <T extends PredicateFunction>(thing: unknown, validator: T): thing is Array<PredicateType<T>> => {
    return Array.isArray(thing) && thing.every(validator);
  };

  const isBoolean = (a: unknown): a is boolean => typeof a === "boolean";
  const isNumber = (a: unknown): a is number => typeof a === "number";
  const isString = (a: unknown): a is string => typeof a === "string";

  if (isArrayOf(chainingTestArray, isBoolean)) {
    type cases = [Assert<IsExact<typeof chainingTestArray, boolean[]>>];
  }

  if (isArrayOf(chainingTestArray, isNumber)) {
    type cases = [Assert<IsExact<typeof chainingTestArray, number[]>>];
  }

  if (isArrayOf(chainingTestArray, isString)) {
    type cases = [Assert<IsExact<typeof chainingTestArray, string[]>>];
  }
}
