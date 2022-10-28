import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { ValueOf, Primitive } from "../lib/types";

declare const array: number[] | undefined;
declare const func: (...arg: any[]) => boolean;
declare const obj: { propA: string; propB: number; propC: () => void };
declare const tuple: [1, 2, 3, 4];
declare const primitive: Primitive;
declare const primitiveOrObject: Primitive | typeof obj;
declare const objOrFunc: typeof func | typeof obj;

function testValueOf() {
  type cases = [
    Assert<IsExact<ValueOf<typeof obj>, string | number | (() => void)>>,
    Assert<IsExact<ValueOf<typeof array>, number | undefined>>,
    Assert<IsExact<ValueOf<typeof func>, boolean>>,
    Assert<IsExact<ValueOf<typeof tuple>, 1 | 2 | 3 | 4>>,
    Assert<IsExact<ValueOf<string>, string>>,
    // valueOf for constant primitive literals will be the literal type
    Assert<IsExact<ValueOf<"const">, "const">>,
    Assert<IsExact<ValueOf<23>, 23>>,
    Assert<IsExact<ValueOf<undefined>, undefined>>,
    Assert<IsExact<ValueOf<{ a: "1"; b: 2 }>, "1" | 2>>,
    // Combination of these types
    Assert<IsExact<ValueOf<typeof primitive>, Primitive>>,
    Assert<IsExact<ValueOf<typeof primitiveOrObject>, ValueOf<Primitive> | ValueOf<typeof obj>>>,
    Assert<IsExact<ValueOf<typeof objOrFunc>, ValueOf<typeof obj | ValueOf<typeof func>>>>,
    Assert<IsExact<ValueOf<23 | number>, number>>,
    Assert<IsExact<ValueOf<[number[], string[]]>, number[] | string[]>>,
    Assert<IsExact<ValueOf<number[] | string | null>, number | string | null>>,
    Assert<IsExact<ValueOf<boolean[] | typeof obj>, boolean | ValueOf<typeof obj>>>,
    Assert<IsExact<ValueOf<[string, number] | { keyA: bigint; keyB: null }>, string | number | bigint | null>>,
  ];
}
