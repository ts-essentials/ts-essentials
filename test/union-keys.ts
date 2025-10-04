import { AssertTrue, IsExact } from "conditional-type-checks";
import { UnionKeys } from "../lib";

function testUnionKeys() {
  type UnionOf1 = { type: "start"; ms: number };
  type UnionOf2 = UnionOf1 | { type: "stop"; reason: string };
  type UnionOf3 = UnionOf2 | { type: "report"; crashed: boolean };

  type assertion = [
    AssertTrue<IsExact<UnionKeys<never>, never>>,
    AssertTrue<IsExact<UnionKeys<UnionOf1>, "type" | "ms">>,
    AssertTrue<IsExact<UnionKeys<UnionOf2>, "type" | "ms" | "reason">>,
    AssertTrue<IsExact<UnionKeys<UnionOf3>, "type" | "ms" | "reason" | "crashed">>,
  ];
}
