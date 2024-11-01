import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { ReadonlyKeys } from "../lib";

function testReadonlyKeys() {
  type cases = [
    Assert<IsExact<ReadonlyKeys<[1, 2?]>, typeof Symbol.unscopables>>,
    Assert<IsExact<ReadonlyKeys<readonly [1, 2?]>, "0" | "1" | number | "length" | typeof Symbol.unscopables>>,
    Assert<IsExact<ReadonlyKeys<string[]>, typeof Symbol.unscopables>>,
    Assert<IsExact<ReadonlyKeys<readonly string[]>, number | "length" | typeof Symbol.unscopables>>,
    Assert<IsExact<ReadonlyKeys<{ readonly [x: string]: 1 }>, string | number>>,
  ];
}
