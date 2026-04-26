import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { RequiredKeys } from "..";

function testRequiredKeys() {
  type cases = [
    Assert<IsExact<RequiredKeys<number>, keyof Number>>,
    Assert<IsExact<RequiredKeys<string>, keyof string>>,
    Assert<IsExact<RequiredKeys<boolean>, keyof Boolean>>,
    Assert<IsExact<RequiredKeys<bigint>, keyof BigInt>>,
    Assert<IsExact<RequiredKeys<symbol>, keyof symbol>>,
    Assert<IsExact<RequiredKeys<undefined>, never>>,
    Assert<IsExact<RequiredKeys<null>, never>>,
    Assert<IsExact<RequiredKeys<Function>, keyof Function>>,
    Assert<IsExact<RequiredKeys<Date>, keyof Date>>,
    Assert<IsExact<RequiredKeys<Error>, "name" | "message">>,
    Assert<IsExact<RequiredKeys<RegExp>, keyof RegExp>>,
    Assert<IsExact<RequiredKeys<() => void>, never>>,
    Assert<IsExact<RequiredKeys<any[]>, keyof any[]>>,
    Assert<IsExact<RequiredKeys<[1, 2]>, keyof [1, 2]>>,
    Assert<IsExact<RequiredKeys<{ (): void; a?: 1 }>, never>>,
    Assert<IsExact<RequiredKeys<{ (): void; a: 1 }>, "a">>,
    Assert<IsExact<RequiredKeys<[1, 2?]>, Exclude<keyof [1, 2?], "1">>>,
    Assert<IsExact<RequiredKeys<{}>, never>>,
    Assert<IsExact<RequiredKeys<{ a: 1 }>, "a">>,
    Assert<IsExact<RequiredKeys<{ a?: 1 }>, never>>,
    Assert<IsExact<RequiredKeys<{ a: 1 | undefined }>, "a">>,
    Assert<IsExact<RequiredKeys<{ a: 1 | null }>, "a">>,
    Assert<IsExact<RequiredKeys<{ a?: 1 } | { b: 2 }>, "b">>,
    Assert<IsExact<RequiredKeys<{ a?: 1 } | { b?: 2 }>, never>>,
    Assert<IsExact<RequiredKeys<{ a?: 1 } | { b: 2 | undefined }>, "b">>,
    Assert<IsExact<RequiredKeys<{ a?: 1 } | { b: 2 | null }>, "b">>,
    Assert<IsExact<RequiredKeys<{ a: 1 } | { b: 2 }>, "a" | "b">>,
    Assert<IsExact<RequiredKeys<{ a: 1 } | { b?: 2 }>, "a">>,
    Assert<IsExact<RequiredKeys<{ a: 1 } | { b: 2 | undefined }>, "a" | "b">>,
    Assert<IsExact<RequiredKeys<{ a: 1 } | { b: 2 | null }>, "a" | "b">>,
  ];
}
