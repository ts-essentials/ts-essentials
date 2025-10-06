import { AssertTrue, IsExact } from "conditional-type-checks";
import { UnionToIntersection } from "../lib";

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
