import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { IsNever } from "../lib";

function testIsNever() {
  type cases = [
    Assert<IsExact<IsNever<string>, false>>,
    Assert<IsExact<IsNever<number>, false>>,
    Assert<IsExact<IsNever<boolean>, false>>,
    Assert<IsExact<IsNever<bigint>, false>>,
    Assert<IsExact<IsNever<symbol>, false>>,
    Assert<IsExact<IsNever<undefined>, false>>,
    Assert<IsExact<IsNever<null>, false>>,
    Assert<IsExact<IsNever<Function>, false>>,
    Assert<IsExact<IsNever<Date>, false>>,
    Assert<IsExact<IsNever<Error>, false>>,
    Assert<IsExact<IsNever<RegExp>, false>>,
    Assert<IsExact<IsNever<Map<string, unknown>>, false>>,
    Assert<IsExact<IsNever<ReadonlyMap<string, unknown>>, false>>,
    Assert<IsExact<IsNever<WeakMap<{ a: 1 }, unknown>>, false>>,
    Assert<IsExact<IsNever<Set<string>>, false>>,
    Assert<IsExact<IsNever<ReadonlySet<string>>, false>>,
    Assert<IsExact<IsNever<WeakSet<{ a: 1 }>>, false>>,
    Assert<IsExact<IsNever<{ a: 1 }>, false>>,
    Assert<IsExact<IsNever<[]>, false>>,
    Assert<IsExact<IsNever<[1]>, false>>,
    Assert<IsExact<IsNever<readonly [1]>, false>>,
    Assert<IsExact<IsNever<readonly number[]>, false>>,
    Assert<IsExact<IsNever<number[]>, false>>,
    Assert<IsExact<IsNever<Promise<number>>, false>>,
    Assert<IsExact<IsNever<unknown>, false>>,
    Assert<IsExact<IsNever<never>, true>>,
    Assert<IsExact<IsNever<any>, false>>,
  ];
}
