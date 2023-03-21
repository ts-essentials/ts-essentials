import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { PickKeys } from "../lib";
import { TsVersion } from "./ts-version";

function testPickKeys() {
  type cases = [
    // @ts-expect-error converts to Number and gets `number | undefined` keys
    Assert<IsExact<PickKeys<number, number | undefined>, never>>,
    // @ts-expect-error converts to String and gets `number | undefined` keys
    Assert<IsExact<PickKeys<string, number | undefined>, never>>,
    // wtf?
    Assert<IsExact<PickKeys<boolean, number | undefined>, () => boolean>>,
    // @ts-expect-error converts to BigInt and gets `number | undefined` keys
    Assert<IsExact<PickKeys<bigint, number | undefined>, never>>,
    // wtf?
    Assert<
      IsExact<
        PickKeys<symbol, number | undefined>,
        string | ((hint: string) => symbol) | (() => string) | (() => symbol)
      >
    >,
    Assert<IsExact<PickKeys<undefined, number | undefined>, never>>,
    Assert<IsExact<PickKeys<null, number | undefined>, never>>,
    Assert<IsExact<PickKeys<Function, number | undefined>, "prototype" | "length" | "arguments">>,
    Assert<IsExact<PickKeys<Date, number | undefined>, never>>,
    Assert<IsExact<PickKeys<Error, number | undefined>, never>>,
    Assert<IsExact<PickKeys<RegExp, number | undefined>, "lastIndex">>,
    Assert<IsExact<PickKeys<{}, number | undefined>, never>>,
    Assert<IsExact<PickKeys<{ a: 1 }, number | undefined>, "a">>,
    Assert<IsExact<PickKeys<{ a?: 1 }, number | undefined>, "a">>,
    Assert<IsExact<PickKeys<{ a: 1 | undefined }, number | undefined>, "a">>,
    Assert<IsExact<PickKeys<{ a: 1 | null }, number | undefined>, never>>,
    // doesn't support unions
    Assert<IsExact<PickKeys<{ a?: 1 } | { b: 2 }, number | undefined>, never>>,
    Assert<IsExact<PickKeys<{ a?: 1 } | { b?: 2 }, number | undefined>, never>>,
    Assert<IsExact<PickKeys<{ a?: 1 } | { b: 2 | undefined }, number | undefined>, never>>,
    Assert<IsExact<PickKeys<{ a?: 1 } | { b: 2 | null }, number | undefined>, never>>,
    Assert<IsExact<PickKeys<{ a: 1 } | { b: 2 }, number | undefined>, never>>,
    Assert<IsExact<PickKeys<{ a: 1 } | { b?: 2 }, number | undefined>, never>>,
    Assert<IsExact<PickKeys<{ a: 1 } | { b: 2 | undefined }, number | undefined>, never>>,
    Assert<IsExact<PickKeys<{ a: 1 } | { b: 2 | null }, number | undefined>, never>>,
  ];
}
