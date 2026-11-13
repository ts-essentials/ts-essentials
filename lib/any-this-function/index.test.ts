import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { AnyThisFunction } from "..";

function testAnyThisFunction() {
  type Receiver = { value: number };
  type Args = [precision: number];
  type Format = AnyThisFunction<Receiver, Args, string>;

  type cases = [
    Assert<IsExact<ThisParameterType<Format>, Receiver>>,
    Assert<IsExact<Parameters<Format>, Args>>,
    Assert<IsExact<ReturnType<Format>, string>>,
    Assert<IsExact<AnyThisFunction<Receiver>, (this: Receiver, ...args: any[]) => any>>,
  ];

  const format: Format = function (precision) {
    return this.value.toFixed(precision);
  };
  format.call({ value: 1 }, 2);
  // @ts-expect-error the receiver must have a numeric value
  format.call({ value: "1" }, 2);
}
