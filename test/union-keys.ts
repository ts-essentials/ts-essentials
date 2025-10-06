import { AssertTrue, IsExact } from "conditional-type-checks";
import { UnionKeys } from "../lib";

function testAssignability() {
  // @ts-expect-error: `UnionKeys<Type>` is NOT assignable to `keyof Type`
  let test1: <Type>(object: Type, propertyNames: keyof Type) => propertyNames is UnionKeys<Type>;

  // `keyof Type` is assignable to `UnionKeys<Type>`
  let test2: <Type>(object: Type, propertyNames: UnionKeys<Type>) => propertyNames is keyof Type;

  // `UnionKeys<Type>` is assignable to `PropertyKey`
  let test3: <Type>(object: Type, propertyNames: PropertyKey) => propertyNames is UnionKeys<Type>;

  // @ts-expect-error: `PropertyKey` is NOT assignable to `UnionKeys<Type>`
  let test4: <Type>(object: Type, propertyNames: UnionKeys<Type>) => propertyNames is PropertyKey;
}

function testUnionKeys() {
  type UnionOf1 = { type: "start"; ms: number };
  type UnionOf2 = UnionOf1 | { type: "stop"; reason: string };
  type UnionOf3 = UnionOf2 | { type: "report"; crashed: boolean };

  type a = UnionKeys<never>;

  type assertions = [
    AssertTrue<IsExact<UnionKeys<never>, PropertyKey>>,
    AssertTrue<IsExact<UnionKeys<UnionOf1>, "type" | "ms">>,
    AssertTrue<IsExact<UnionKeys<UnionOf2>, "type" | "ms" | "reason">>,
    AssertTrue<IsExact<UnionKeys<UnionOf3>, "type" | "ms" | "reason" | "crashed">>,
  ];
}
