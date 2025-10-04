import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { IsUnknown } from "../lib";

function testIsUnknown() {
  type cases = [
    Assert<IsExact<IsUnknown<string>, false>>,
    Assert<IsExact<IsUnknown<number>, false>>,
    Assert<IsExact<IsUnknown<boolean>, false>>,
    Assert<IsExact<IsUnknown<bigint>, false>>,
    Assert<IsExact<IsUnknown<symbol>, false>>,
    Assert<IsExact<IsUnknown<undefined>, false>>,
    Assert<IsExact<IsUnknown<null>, false>>,
    Assert<IsExact<IsUnknown<Function>, false>>,
    Assert<IsExact<IsUnknown<Date>, false>>,
    Assert<IsExact<IsUnknown<Error>, false>>,
    Assert<IsExact<IsUnknown<RegExp>, false>>,
    Assert<IsExact<IsUnknown<Map<string, unknown>>, false>>,
    Assert<IsExact<IsUnknown<ReadonlyMap<string, unknown>>, false>>,
    Assert<IsExact<IsUnknown<WeakMap<{ a: 1 }, unknown>>, false>>,
    Assert<IsExact<IsUnknown<Set<string>>, false>>,
    Assert<IsExact<IsUnknown<ReadonlySet<string>>, false>>,
    Assert<IsExact<IsUnknown<WeakSet<{ a: 1 }>>, false>>,
    Assert<IsExact<IsUnknown<{ a: 1 }>, false>>,
    Assert<IsExact<IsUnknown<[]>, false>>,
    Assert<IsExact<IsUnknown<[1]>, false>>,
    Assert<IsExact<IsUnknown<readonly [1]>, false>>,
    Assert<IsExact<IsUnknown<readonly number[]>, false>>,
    Assert<IsExact<IsUnknown<number[]>, false>>,
    Assert<IsExact<IsUnknown<Promise<number>>, false>>,
    Assert<IsExact<IsUnknown<unknown>, true>>,
    Assert<IsExact<IsUnknown<never>, false>>,
    Assert<IsExact<IsUnknown<any>, false>>,
  ];
}
