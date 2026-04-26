import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Dictionary, KeyofBase } from "..";

function testDictionary() {
  type cases = [
    Assert<IsExact<Dictionary<number>[string], number>>,
    Assert<IsExact<Dictionary<number>[number], number>>,
    // @ts-expect-error cannot use boolean as dictionary key
    Dictionary<number>[boolean],
    // @ts-expect-error cannot use bigint as dictionary key
    Dictionary<number>[bigint],
    // @ts-expect-error cannot use symbol as dictionary key
    Dictionary<number>[symbol],
    // @ts-expect-error cannot use undefined as dictionary key
    Dictionary<number>[undefined],
    // @ts-expect-error cannot use null as dictionary key
    Dictionary<number>[null],
    // @ts-expect-error cannot use string as only 'a' | 'b' allowed
    Assert<IsExact<Dictionary<number, "a" | "b">[string], number>>,
    Assert<IsExact<Dictionary<number, "a" | "b">["a"], number>>,
    Assert<IsExact<Dictionary<number, "a" | "b">["b"], number>>,
    Assert<IsExact<Dictionary<number, KeyofBase>[symbol], number>>,
  ];
}
