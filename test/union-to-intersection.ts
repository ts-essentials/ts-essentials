import { AssertTrue, IsExact } from "conditional-type-checks";
import { UnionToIntersection } from "../lib";

function testAssignability() {
  // `UnionToIntersection<Type>` is assignable to `Type`
  let test1: <Type>(t: Type) => t is UnionToIntersection<Type>;

  // @ts-expect-error: `Type` is NOT assignable to `UnionToIntersection<Type>`
  let test2: <Type>(t: UnionToIntersection<Type>) => t is Type;

  // `UnionToIntersection<Type1 | Type2>` is assignable to `Type1 | Type2`
  let test3: <Type1, Type2>(t: Type1 | Type2) => t is UnionToIntersection<Type1 | Type2>;

  // @ts-expect-error: `Type1 | Type2` is NOT assignable to `UnionToIntersection<Type1 | Type2>`
  let test4: <Type1, Type2>(t: UnionToIntersection<Type1 | Type2>) => t is Type1 | Type2;
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
