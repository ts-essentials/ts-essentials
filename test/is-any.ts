import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { IsAny } from "../lib";

function testIsAny() {
  type cases = [
    Assert<IsExact<IsAny<string>, false>>,
    Assert<IsExact<IsAny<number>, false>>,
    Assert<IsExact<IsAny<boolean>, false>>,
    Assert<IsExact<IsAny<bigint>, false>>,
    Assert<IsExact<IsAny<symbol>, false>>,
    Assert<IsExact<IsAny<undefined>, false>>,
    Assert<IsExact<IsAny<null>, false>>,
    Assert<IsExact<IsAny<Function>, false>>,
    Assert<IsExact<IsAny<Date>, false>>,
    Assert<IsExact<IsAny<Error>, false>>,
    Assert<IsExact<IsAny<RegExp>, false>>,
    Assert<IsExact<IsAny<Map<string, unknown>>, false>>,
    Assert<IsExact<IsAny<ReadonlyMap<string, unknown>>, false>>,
    Assert<IsExact<IsAny<WeakMap<{ a: 1 }, unknown>>, false>>,
    Assert<IsExact<IsAny<Set<string>>, false>>,
    Assert<IsExact<IsAny<ReadonlySet<string>>, false>>,
    Assert<IsExact<IsAny<WeakSet<{ a: 1 }>>, false>>,
    Assert<IsExact<IsAny<{ a: 1 }>, false>>,
    Assert<IsExact<IsAny<[]>, false>>,
    Assert<IsExact<IsAny<[1]>, false>>,
    Assert<IsExact<IsAny<readonly [1]>, false>>,
    Assert<IsExact<IsAny<readonly number[]>, false>>,
    Assert<IsExact<IsAny<number[]>, false>>,
    Assert<IsExact<IsAny<Promise<number>>, false>>,
    Assert<IsExact<IsAny<unknown>, false>>,
    Assert<IsExact<IsAny<never>, false>>,
    Assert<IsExact<IsAny<any>, true>>,
  ];
}
