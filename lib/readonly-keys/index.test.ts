import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { ReadonlyKeys } from "..";

function testReadonlyKeys() {
  type cases = [
    // @ts-expect-error primitives not allowed
    ReadonlyKeys<string>,
    // @ts-expect-error primitives not allowed
    ReadonlyKeys<number>,
    // @ts-expect-error primitives not allowed
    ReadonlyKeys<boolean>,
    // @ts-expect-error primitives not allowed
    ReadonlyKeys<bigint>,
    // @ts-expect-error primitives not allowed
    ReadonlyKeys<symbol>,
    // @ts-expect-error primitives not allowed
    ReadonlyKeys<null>,
    // @ts-expect-error primitives not allowed
    ReadonlyKeys<undefined>,
    Assert<IsExact<ReadonlyKeys<{}>, never>>,
    Assert<IsExact<ReadonlyKeys<{ readonly a: 1; b: 2 }>, "a">>,
    Assert<IsExact<ReadonlyKeys<{ a?: 1; readonly b?: 2 }>, "b">>,
    Assert<IsExact<ReadonlyKeys<{ [x: string]: 1 }>, never>>,
    Assert<IsExact<ReadonlyKeys<{ readonly a: 1; b: 2 } | { readonly c: 3; d?: 4 }>, "a" | "c">>,
    Assert<IsExact<ReadonlyKeys<() => void>, never>>,
    Assert<IsExact<ReadonlyKeys<{ (): void; readonly a: 1 }>, "a">>,
  ];
}
