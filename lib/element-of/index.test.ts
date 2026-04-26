import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { ElementOf } from "..";

function testElementOf() {
  const t1 = [1, 2, true, false];
  const t2 = ["one"] as const;

  type assertions = [
    Assert<IsExact<ElementOf<typeof t1>, number | boolean>>,
    Assert<IsExact<ElementOf<typeof t2>, "one">>,
  ];
}
