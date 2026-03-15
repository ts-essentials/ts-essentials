import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { WritableKeys } from "..";

function testWritableKeys() {
  type cases = [
    // @ts-expect-error primitives not allowed
    WritableKeys<string>,
    // @ts-expect-error primitives not allowed
    WritableKeys<number>,
    // @ts-expect-error primitives not allowed
    WritableKeys<boolean>,
    // @ts-expect-error primitives not allowed
    WritableKeys<bigint>,
    // @ts-expect-error primitives not allowed
    WritableKeys<symbol>,
    // @ts-expect-error primitives not allowed
    WritableKeys<null>,
    // @ts-expect-error primitives not allowed
    WritableKeys<undefined>,
    Assert<IsExact<WritableKeys<{}>, never>>,
    Assert<IsExact<WritableKeys<{ readonly a: 1; b: 2 }>, "b">>,
    Assert<IsExact<WritableKeys<{ a?: 1; readonly b?: 2 }>, "a">>,
    Assert<IsExact<WritableKeys<{ [x: string]: 1 }>, string | number>>,
    Assert<IsExact<WritableKeys<{ readonly a: 1; b: 2 } | { readonly c: 3; d?: 4 }>, "b" | "d">>,
    Assert<IsExact<WritableKeys<() => void>, never>>,
    Assert<IsExact<WritableKeys<{ (): void; a: 1 }>, "a">>,
  ];
}
