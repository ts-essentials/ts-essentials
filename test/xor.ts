import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { XOR } from "../lib";

function testXOR() {
  type TestType1 = { a: string };
  type TestType2 = { a: number; b: boolean };
  type TestType3 = { c: number; d: boolean };

  type Actual1 = XOR<TestType1, TestType2>;
  type Expected1 = { a: string; b?: never } | { a: number; b: boolean } | { a?: never; b?: never };

  type Actual2 = XOR<TestType1, TestType3>;
  type Expected2 =
    | { a: string; c?: never; d?: never }
    | { a?: never; c: number; d: boolean }
    | { a?: never; c?: never; d?: never };

  type Test1 = Assert<IsExact<Actual1, Expected1>>;
  type Test2 = Assert<IsExact<Actual2, Expected2>>;

  type SinglePet = XOR<
    { cat: string },
    { dog: string },
    { parrot: string },
    { fish: string },
    { rabbit: string },
    { turtle: string },
    { guineaPig: string },
    { hamster: string }
  >;

  let singlePet: SinglePet;
  singlePet = { cat: "Timofey" };
  singlePet = { dog: "Sirius" };
  // @ts-expect-error: cannot have both
  singlePet = { cat: "Timofey", dog: "Sirius" };
}

function stressTestXOR() {
  type StressTest = XOR<
    { property1: string },
    { property2: string },
    { property3: string },
    { property4: string },
    { property5: string },
    { property6: string },
    { property7: string },
    { property8: string },
    { property9: string },
    { property10: string },
    { property11: string },
    { property12: string },
    { property13: string },
    { property14: string },
    { property15: string },
    { property16: string },
    { property17: string },
    { property18: string },
    { property19: string },
    { property20: string },
    { property21: string },
    { property22: string },
    { property23: string },
    { property24: string },
    { property25: string },
    { property26: string },
    { property27: string },
    { property28: string },
    { property29: string },
    { property30: string },
    { property31: string },
    { property32: string },
    { property33: string },
    { property34: string },
    { property35: string },
    { property36: string },
    { property37: string },
    { property38: string },
    { property39: string },
    { property40: string },
    { property41: string },
    { property42: string },
    { property43: string },
    { property44: string },
    { property45: string },
    { property46: string },
    { property47: string },
    { property48: string },
    { property49: string },
    { property50: string }
  >;

  var test: StressTest;

  // passed
  test = { property1: "boo" };
  test = { property2: "boo" };
  test = { property3: "boo" };
  test = { property4: "boo" };
  test = { property5: "boo" };
  test = { property6: "boo" };
  test = { property7: "boo" };
  test = { property8: "boo" };
  test = { property9: "boo" };
  test = { property10: "boo" };
  test = { property11: "boo" };
  test = { property12: "boo" };
  test = { property13: "boo" };
  test = { property14: "boo" };
  test = { property15: "boo" };
  test = { property16: "boo" };
  test = { property17: "boo" };
  test = { property18: "boo" };
  test = { property19: "boo" };
  test = { property20: "boo" };
  test = { property21: "boo" };
  test = { property22: "boo" };
  test = { property23: "boo" };
  test = { property24: "boo" };
  test = { property25: "boo" };
  test = { property26: "boo" };
  test = { property27: "boo" };
  test = { property28: "boo" };
  test = { property29: "boo" };
  test = { property30: "boo" };
  test = { property31: "boo" };
  test = { property32: "boo" };
  test = { property33: "boo" };
  test = { property34: "boo" };
  test = { property35: "boo" };
  test = { property36: "boo" };
  test = { property37: "boo" };
  test = { property38: "boo" };
  test = { property39: "boo" };
  test = { property40: "boo" };
  test = { property41: "boo" };
  test = { property42: "boo" };
  test = { property43: "boo" };
  test = { property44: "boo" };
  test = { property45: "boo" };
  test = { property46: "boo" };
  test = { property47: "boo" };
  test = { property48: "boo" };
  test = { property49: "boo" };
  test = { property50: "boo" };

  // failed
  // @ts-expect-error
  test = { property1: "boo", property2: "boo" };
  // @ts-expect-error
  test = { property2: "boo", property3: "boo" };
  // @ts-expect-error
  test = { property3: "boo", property4: "boo" };
  // @ts-expect-error
  test = { property4: "boo", property5: "boo" };
  // @ts-expect-error
  test = { property5: "boo", property6: "boo" };
  // @ts-expect-error
  test = { property6: "boo", property7: "boo" };
  // @ts-expect-error
  test = { property7: "boo", property8: "boo" };
  // @ts-expect-error
  test = { property8: "boo", property9: "boo" };
  // @ts-expect-error
  test = { property9: "boo", property10: "boo" };
  // @ts-expect-error
  test = { property10: "boo", property11: "boo" };
  // @ts-expect-error
  test = { property11: "boo", property12: "boo" };
  // @ts-expect-error
  test = { property12: "boo", property13: "boo" };
  // @ts-expect-error
  test = { property13: "boo", property14: "boo" };
  // @ts-expect-error
  test = { property14: "boo", property15: "boo" };
  // @ts-expect-error
  test = { property15: "boo", property16: "boo" };
  // @ts-expect-error
  test = { property16: "boo", property17: "boo" };
  // @ts-expect-error
  test = { property17: "boo", property18: "boo" };
  // @ts-expect-error
  test = { property18: "boo", property19: "boo" };
  // @ts-expect-error
  test = { property19: "boo", property20: "boo" };
  // @ts-expect-error
  test = { property20: "boo", property21: "boo" };
  // @ts-expect-error
  test = { property21: "boo", property22: "boo" };
  // @ts-expect-error
  test = { property22: "boo", property23: "boo" };
  // @ts-expect-error
  test = { property23: "boo", property24: "boo" };
  // @ts-expect-error
  test = { property24: "boo", property25: "boo" };
  // @ts-expect-error
  test = { property25: "boo", property26: "boo" };
  // @ts-expect-error
  test = { property26: "boo", property27: "boo" };
  // @ts-expect-error
  test = { property27: "boo", property28: "boo" };
  // @ts-expect-error
  test = { property28: "boo", property29: "boo" };
  // @ts-expect-error
  test = { property29: "boo", property30: "boo" };
  // @ts-expect-error
  test = { property30: "boo", property31: "boo" };
  // @ts-expect-error
  test = { property31: "boo", property32: "boo" };
  // @ts-expect-error
  test = { property32: "boo", property33: "boo" };
  // @ts-expect-error
  test = { property33: "boo", property34: "boo" };
  // @ts-expect-error
  test = { property34: "boo", property35: "boo" };
  // @ts-expect-error
  test = { property35: "boo", property36: "boo" };
  // @ts-expect-error
  test = { property36: "boo", property37: "boo" };
  // @ts-expect-error
  test = { property37: "boo", property38: "boo" };
  // @ts-expect-error
  test = { property38: "boo", property39: "boo" };
  // @ts-expect-error
  test = { property39: "boo", property40: "boo" };
  // @ts-expect-error
  test = { property40: "boo", property41: "boo" };
  // @ts-expect-error
  test = { property41: "boo", property42: "boo" };
  // @ts-expect-error
  test = { property42: "boo", property43: "boo" };
  // @ts-expect-error
  test = { property43: "boo", property44: "boo" };
  // @ts-expect-error
  test = { property44: "boo", property45: "boo" };
  // @ts-expect-error
  test = { property45: "boo", property46: "boo" };
  // @ts-expect-error
  test = { property46: "boo", property47: "boo" };
  // @ts-expect-error
  test = { property47: "boo", property48: "boo" };
  // @ts-expect-error
  test = { property48: "boo", property49: "boo" };
  // @ts-expect-error
  test = { property49: "boo", property50: "boo" };
  // @ts-expect-error
  test = { property50: "boo", property1: "boo" };
}
