/**
 * This file contains a lot of unused functions as it's only typechecked.
 */
import { AssertTrue as Assert, IsExact } from "conditional-type-checks";

import { ReadonlyArrayOrSingle } from "../lib";

function testReadonlyArrayOrSingle() {
  const isReadonlyArray = (value: unknown): value is readonly unknown[] => {
    return Array.isArray(value);
  };

  const castArray = <T>(value: ReadonlyArrayOrSingle<T>): readonly T[] => {
    if (isReadonlyArray(value)) {
      return value;
    }

    return [value];
  };

  const numbers1 = castArray(1);
  const numbers2 = castArray([1]);
  const strings1 = castArray("hello");
  const strings2 = castArray(["hello"]);
  const booleans1 = castArray(false);
  const booleans2 = castArray([false]);
  const nulls1 = castArray(null);
  const nulls2 = castArray([null]);
  const undefined1 = castArray(undefined);
  const undefined2 = castArray([undefined]);

  type cases = [
    Assert<IsExact<ReadonlyArrayOrSingle<never>, never | readonly never[]>>,
    Assert<IsExact<ReadonlyArrayOrSingle<string>, string | readonly string[]>>,
    Assert<IsExact<ReadonlyArrayOrSingle<1>, 1 | readonly 1[]>>,
    Assert<IsExact<ReadonlyArrayOrSingle<"1">, "1" | readonly "1"[]>>,
    Assert<IsExact<ReadonlyArrayOrSingle<string | number>, string | number | readonly (string | number)[]>>,
    Assert<IsExact<ReadonlyArrayOrSingle<{ a: number }>, { a: number } | readonly { a: number }[]>>,
    Assert<IsExact<typeof numbers1, readonly number[]>>,
    Assert<IsExact<typeof numbers2, readonly number[]>>,
    Assert<IsExact<typeof strings1, readonly string[]>>,
    Assert<IsExact<typeof strings2, readonly string[]>>,
    Assert<IsExact<typeof booleans1, readonly boolean[]>>,
    Assert<IsExact<typeof booleans2, readonly boolean[]>>,
    Assert<IsExact<typeof nulls1, readonly null[]>>,
    Assert<IsExact<typeof nulls2, readonly null[]>>,
    Assert<IsExact<typeof undefined1, readonly undefined[]>>,
    Assert<IsExact<typeof undefined2, readonly undefined[]>>,
  ];
}
