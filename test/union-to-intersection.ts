import { AssertTrue, IsExact } from "conditional-type-checks";
import { UnionToIntersection } from "../lib";

function testAssignability() {
  // `UnionToIntersection<T>` is assignable to `T`
  let test1: <T>(t: T) => t is UnionToIntersection<T>;

  // @ts-expect-error: `T` is NOT assignable to `UnionToIntersection<T>`
  let test2: <T>(t: UnionToIntersection<T>) => t is T;

  // `UnionToIntersection<T | U>` is assignable to `T | U`
  let test3: <T, U>(t: T | U) => t is UnionToIntersection<T | U>;

  // @ts-expect-error: `T | U` is NOT assignable to `UnionToIntersection<T | U>`
  let test4: <T, U>(t: UnionToIntersection<T | U>) => t is T | U;
}

function testUnionToIntersection() {
  type WithName = { name: string };
  type WithAge = { age: number };
  type WithGender = { gender: string };

  type assertions = [
    AssertTrue<IsExact<UnionToIntersection<WithName>, { name: string }>>,
    AssertTrue<IsExact<UnionToIntersection<WithName | WithAge>, { age: number; name: string }>>,
    AssertTrue<
      IsExact<UnionToIntersection<WithName | WithAge | WithGender>, { age: number; gender: string; name: string }>
    >,
  ];
}
