import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { OptionalKeys } from "..";

function testOptionalKeys() {
  type cases = [
    Assert<IsExact<OptionalKeys<number>, never>>,
    Assert<IsExact<OptionalKeys<string>, never>>,
    Assert<IsExact<OptionalKeys<boolean>, never>>,
    Assert<IsExact<OptionalKeys<bigint>, never>>,
    Assert<IsExact<OptionalKeys<symbol>, never>>,
    Assert<IsExact<OptionalKeys<undefined>, never>>,
    Assert<IsExact<OptionalKeys<null>, never>>,
    Assert<IsExact<OptionalKeys<Function>, never>>,
    Assert<IsExact<OptionalKeys<Date>, never>>,
    Assert<IsExact<OptionalKeys<Error>, "stack">>,
    Assert<IsExact<OptionalKeys<RegExp>, never>>,
    Assert<IsExact<OptionalKeys<() => void>, never>>,
    Assert<IsExact<OptionalKeys<any[]>, never>>,
    Assert<IsExact<OptionalKeys<[1, 2]>, never>>,
    Assert<IsExact<OptionalKeys<[1, 2?]>, "1">>,
    Assert<IsExact<OptionalKeys<{ (): void; a?: 1 }>, "a">>,
    Assert<IsExact<OptionalKeys<{ (): void; a: 1 }>, never>>,
    Assert<IsExact<OptionalKeys<{}>, never>>,
    Assert<IsExact<OptionalKeys<{ a: 1 }>, never>>,
    Assert<IsExact<OptionalKeys<{ a?: 1 }>, "a">>,
    Assert<IsExact<OptionalKeys<{ a: 1 | undefined }>, never>>,
    Assert<IsExact<OptionalKeys<{ a: 1 | null }>, never>>,
    Assert<IsExact<OptionalKeys<{ a?: 1 } | { b: 2 }>, "a">>,
    Assert<IsExact<OptionalKeys<{ a?: 1 } | { b?: 2 }>, "a" | "b">>,
    Assert<IsExact<OptionalKeys<{ a?: 1 } | { b: 2 | undefined }>, "a">>,
    Assert<IsExact<OptionalKeys<{ a?: 1 } | { b: 2 | null }>, "a">>,
    Assert<IsExact<OptionalKeys<{ a: 1 } | { b: 2 }>, never>>,
    Assert<IsExact<OptionalKeys<{ a: 1 } | { b?: 2 }>, "b">>,
    Assert<IsExact<OptionalKeys<{ a: 1 } | { b: 2 | undefined }>, never>>,
    Assert<IsExact<OptionalKeys<{ a: 1 } | { b: 2 | null }>, never>>,
  ];
}
