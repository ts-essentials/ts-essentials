import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { ArrayOrSingle } from "..";

function testArrayOrSingle() {
  const castArray = <T extends any>(value: ArrayOrSingle<T>): T[] => {
    if (Array.isArray(value)) {
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
    Assert<IsExact<ArrayOrSingle<never>, never | never[]>>,
    Assert<IsExact<ArrayOrSingle<string>, string | string[]>>,
    Assert<IsExact<ArrayOrSingle<1>, 1 | 1[]>>,
    Assert<IsExact<ArrayOrSingle<"1">, "1" | "1"[]>>,
    Assert<IsExact<ArrayOrSingle<string | number>, string | number | (string | number)[]>>,
    Assert<IsExact<ArrayOrSingle<{ a: number }>, { a: number } | { a: number }[]>>,
    Assert<IsExact<typeof numbers1, number[]>>,
    Assert<IsExact<typeof numbers2, number[]>>,
    Assert<IsExact<typeof strings1, string[]>>,
    Assert<IsExact<typeof strings2, string[]>>,
    Assert<IsExact<typeof booleans1, boolean[]>>,
    Assert<IsExact<typeof booleans2, boolean[]>>,
    Assert<IsExact<typeof nulls1, null[]>>,
    Assert<IsExact<typeof nulls2, null[]>>,
    Assert<IsExact<typeof undefined1, undefined[]>>,
    Assert<IsExact<typeof undefined2, undefined[]>>,
  ];
}
