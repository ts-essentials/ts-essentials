import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { assert } from "../..";

function testAssert() {
  type TestType1 = string | undefined;
  type Expected = string;
  const anything = undefined as any as TestType1;

  assert(anything);
  type Actual = typeof anything;
  type Test = Assert<IsExact<Actual, string>>;
}
