import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { StrictOmit } from "../lib/types";

function testStrictOmit() {
  type cases = [
    // @ts-expect-error works only with records
    StrictOmit<number, never>,
    // @ts-expect-error works only with records
    StrictOmit<string, never>,
    // @ts-expect-error works only with records
    StrictOmit<boolean, never>,
    // @ts-expect-error works only with records
    StrictOmit<bigint, never>,
    // @ts-expect-error works only with records
    StrictOmit<symbol, never>,
    // @ts-expect-error works only with records
    StrictOmit<undefined, never>,
    // @ts-expect-error works only with records
    StrictOmit<null, never>,
    Assert<IsExact<StrictOmit<Function, never> & Function, Function>>,
    Assert<IsExact<StrictOmit<Date, never> & Date, Date>>,
    Assert<IsExact<StrictOmit<Error, never> & Error, Error>>,
    Assert<IsExact<StrictOmit<RegExp, never> & RegExp, RegExp>>,
    Assert<IsExact<StrictOmit<Map<string, boolean>, never> & Map<string, boolean>, Map<string, boolean>>>,
    Assert<
      IsExact<
        StrictOmit<ReadonlyMap<string, boolean>, never> & ReadonlyMap<string, boolean>,
        ReadonlyMap<string, boolean>
      >
    >,
    Assert<
      IsExact<
        StrictOmit<WeakMap<{ key: string }, boolean>, never> & WeakMap<{ key: string }, boolean>,
        WeakMap<{ key: string }, boolean>
      >
    >,
    Assert<IsExact<StrictOmit<Set<string>, never> & Set<string>, Set<string>>>,
    Assert<IsExact<StrictOmit<ReadonlySet<string>, never> & ReadonlySet<string>, ReadonlySet<string>>>,
    Assert<IsExact<StrictOmit<Promise<number>, never> & Promise<number>, Promise<number>>>,
    Assert<IsExact<StrictOmit<{}, never>, {}>>,
    Assert<IsExact<StrictOmit<{ a: 1 }, never>, { a: 1 }>>,
    Assert<IsExact<StrictOmit<{ a?: 1 }, never>, { a?: 1 }>>,
    Assert<IsExact<StrictOmit<{ a: 1 }, "a">, {}>>,
    Assert<IsExact<StrictOmit<{ a?: 1 }, "a">, {}>>,
    // we don't prohibit arrays and tuples, but return never for them
    Assert<IsExact<StrictOmit<readonly [], never>, never>>,
    Assert<IsExact<StrictOmit<readonly [1, 2, 3], never>, never>>,
    Assert<IsExact<StrictOmit<readonly number[], never>, never>>,
    Assert<IsExact<StrictOmit<Array<number>, never>, never>>,
    Assert<IsExact<StrictOmit<ReadonlyArray<number>, never>, never>>,
    // support of unions
    Assert<
      IsExact<
        StrictOmit<{ a?: 1; b: number } | { a?: 2; b: number }, never>,
        { a?: 1; b: number } | { a?: 2; b: number }
      >
    >,
    Assert<IsExact<StrictOmit<{ a?: 1; b: number } | { a?: 2; b: number }, "b">, { a?: 1 } | { a?: 2 }>>,
    Assert<IsExact<StrictOmit<{ a?: 1; b: number } | { a?: 2; b: number }, "a" | "b">, {}>>,
  ];
}
