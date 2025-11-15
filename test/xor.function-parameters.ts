// XOR utility type didn't infer the correct types in functions parameters for
// TypeScript versions between 4.7.x and 4.8.x, therefore conditionally run this
// file using `scripts/update-test-tsconfig.js`

import { isExact, XOR } from "../lib";

const assertUndefined = isExact<undefined>();
const assertNumber = isExact<number>();
const assertNumberOrUndefined = isExact<number | undefined>();
const assertString = isExact<string>();
const assertStringOrUndefined = isExact<string | undefined>();
const assertStringOrNumber = isExact<string | number>();
const assertBoolean = isExact<boolean>();
const assertBooleanOrUndefined = isExact<boolean | undefined>();
declare const booleanToString: (_: boolean) => string;
declare const numberToString: (_: number) => string;

function testXORInFunctions() {
  // Types have to have mutually exclusive properties

  type TestType1 = { a: string };
  type TestType2 = { b: boolean };
  type TestType3 = { c: number };

  type A1_1 = XOR<TestType1, TestType2>;

  const test1_1 = ({ a, b }: A1_1): string => {
    if (typeof a === "string") return a;
    assertUndefined(a);
    assertBoolean(b);
    return booleanToString(b);
  };

  type A1_2 = XOR<TestType1, TestType2>;

  const test1_2 = ({ a, b }: A1_2): string => {
    if (typeof b === "boolean") return booleanToString(b);
    assertString(a);
    assertUndefined(b);
    return a;
  };

  const test2_1 = ({ a, b }: XOR<TestType1, TestType2, unknown>): string => {
    if (typeof a === "string") return a;
    assertUndefined(a);
    assertBoolean(b);
    return booleanToString(b);
  };

  const test2_2 = ({ a, b }: XOR<TestType1, TestType2, unknown>): string => {
    if (typeof b === "boolean") return booleanToString(b);
    assertString(a);
    assertUndefined(b);
    return a;
  };

  const test3_1 = ({ a, b, c }: XOR<TestType1, TestType2, TestType3>): string => {
    if (typeof a === "string") return a;
    assertUndefined(a);
    assertBooleanOrUndefined(b);
    assertNumberOrUndefined(c);
    if (typeof b === "boolean") return booleanToString(b);
    assertUndefined(a);
    assertUndefined(b);
    assertNumber(c);
    return numberToString(c);
  };

  const test3_2 = ({ a, b, c }: XOR<TestType1, TestType2, TestType3>): string => {
    if (typeof b === "boolean") return booleanToString(b);
    assertStringOrUndefined(a);
    assertUndefined(b);
    assertNumberOrUndefined(c);
    if (typeof a === "string") return a;
    assertUndefined(a);
    assertUndefined(b);
    assertNumber(c);
    return numberToString(c);
  };

  const test3_3 = ({ a, b, c }: XOR<TestType1, TestType2, TestType3>): string => {
    if (typeof c === "number") return numberToString(c);
    assertStringOrUndefined(a);
    assertBooleanOrUndefined(b);
    assertUndefined(c);
    if (typeof a === "string") return a;
    assertUndefined(a);
    assertBoolean(b);
    assertUndefined(c);
    return booleanToString(b);
  };

  // These types don't have to have mutually exclusive properties

  type TestType4 = { d: string };
  type TestType5 = { d: number; e: string };
  type TestType6 = { e: number; f: boolean };

  const test4 = ({ d, e }: XOR<TestType4, TestType5>): string => {
    if (typeof d === "string") return d;
    assertNumber(d);
    assertStringOrUndefined(e);
    if (typeof e === "string") return e;
    assertUndefined(d);
    assertUndefined(e);
    return "";
  };

  const test5_1 = ({ d, e, f }: XOR<TestType4, TestType5, TestType6>): string => {
    if (typeof d === "string") return d;
    assertNumberOrUndefined(d);
    assertStringOrNumber(e);
    assertBooleanOrUndefined(f);
    if (typeof e === "string") return e;
    assertUndefined(d);
    assertNumber(e);
    assertBoolean(f);
    return `${numberToString(e)},${booleanToString(f)}`;
  };

  const test5_2 = ({ d, e, f }: XOR<TestType4, TestType5, TestType6>): string => {
    if (typeof e === "string") return e;
    assertStringOrUndefined(d);
    assertNumberOrUndefined(e);
    assertBooleanOrUndefined(f);
    if (typeof d === "string") return d;
    assertUndefined(d);
    assertNumber(e);
    assertBoolean(f);
    return `${numberToString(e)},${booleanToString(f)}`;
  };
}
