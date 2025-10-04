import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { WritableKeys } from "../lib";

function testWritableKeys() {
  type cases = [
    Assert<IsExact<WritableKeys<[1, 2?]>, Exclude<keyof [1, 2?], typeof Symbol.unscopables>>>,
    Assert<
      IsExact<
        WritableKeys<readonly [1, 2?]>,
        Exclude<keyof (readonly [1, 2?]), "0" | "1" | number | "length" | typeof Symbol.unscopables>
      >
    >,
    Assert<IsExact<WritableKeys<string[]>, Exclude<keyof string[], typeof Symbol.unscopables>>>,
    Assert<
      IsExact<
        WritableKeys<readonly string[]>,
        Exclude<keyof (readonly string[]), number | "length" | typeof Symbol.unscopables>
      >
    >,
    Assert<IsExact<WritableKeys<{ readonly [x: string]: 1 }>, never>>,
  ];
}
