import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { ValueOf, Primitive, AnyArray, Dictionary, SafeDictionary } from "../lib";

declare const array: number[];
declare const func: (...arg: any[]) => boolean;
declare const writableObj: { propA: string; propB: number; propC: () => void };
declare const optionalObj: { propA?: string; propB?: number; propC?: () => void };
declare const readonlyObj: { readonly propA: string; readonly propB: number; readonly propC: () => void };
declare const tuple: [boolean, string, number];
declare const primitive: Primitive;
declare const primitiveOrObject: Primitive | typeof writableObj;
declare const objOrFunc: typeof func | typeof writableObj;
declare const arrayOrUndefined: number[] | undefined;

// declare const readonly
declare const readonlyArray: AnyArray<string | number>;
declare const readonlyArrayOrUndefined: AnyArray<string | number> | undefined;
declare const readonlyTuple: readonly [boolean, string, number];
declare const readonlyTupleOrUndefined: readonly [boolean, string, number] | undefined;

function testValueOf() {
  type cases = [
    Assert<IsExact<ValueOf<typeof writableObj>, string | number | (() => void)>>,
    Assert<IsExact<ValueOf<typeof optionalObj>, string | number | (() => void) | undefined>>,
    Assert<IsExact<ValueOf<typeof readonlyObj>, string | number | (() => void)>>,
    Assert<IsExact<ValueOf<typeof array>, number>>,
    Assert<IsExact<ValueOf<typeof arrayOrUndefined>, number | undefined>>,
    Assert<IsExact<ValueOf<typeof readonlyArray>, string | number>>,
    Assert<IsExact<ValueOf<typeof readonlyArrayOrUndefined>, string | number | undefined>>,
    Assert<IsExact<ValueOf<typeof tuple>, boolean | string | number>>,
    Assert<IsExact<ValueOf<typeof readonlyTuple>, boolean | string | number>>,
    Assert<IsExact<ValueOf<typeof readonlyTupleOrUndefined>, boolean | string | number | undefined>>,
    Assert<IsExact<ValueOf<typeof func>, boolean>>,
    Assert<IsExact<ValueOf<string>, string>>,
    Assert<IsExact<ValueOf<Array<number | undefined>>, number | undefined>>,
    Assert<IsExact<ValueOf<AnyArray<number | undefined>>, number | undefined>>,
    // valueOf for constant primitive literals will be the literal type
    Assert<IsExact<ValueOf<"const">, "const">>,
    Assert<IsExact<ValueOf<23>, 23>>,
    Assert<IsExact<ValueOf<undefined>, undefined>>,
    Assert<IsExact<ValueOf<{ a: "1"; b: 2 }>, "1" | 2>>,
    // Combination of these types
    Assert<IsExact<ValueOf<typeof primitive>, Primitive>>,
    Assert<IsExact<ValueOf<typeof primitiveOrObject>, ValueOf<Primitive> | ValueOf<typeof writableObj>>>,
    Assert<IsExact<ValueOf<typeof objOrFunc>, ValueOf<typeof writableObj | ValueOf<typeof func>>>>,
    Assert<IsExact<ValueOf<[number[], string[]]>, number[] | string[]>>,
    Assert<IsExact<ValueOf<number[] | string | null>, number | string | null>>,
    Assert<IsExact<ValueOf<boolean[] | typeof writableObj>, boolean | ValueOf<typeof writableObj>>>,
    Assert<IsExact<ValueOf<[string, number] | { keyA: bigint; keyB: null }>, string | number | bigint | null>>,
  ];
}

// Moving unit tests in the scope of `ValueOf` since `DictionaryValues` is
// deprecated in favour of `ValueOf`

function testDictionaryValues() {
  type cases = [
    Assert<IsExact<ValueOf<Dictionary<string>>, string>>,
    Assert<IsExact<ValueOf<Dictionary<number>>, number>>,
    Assert<IsExact<ValueOf<Dictionary<boolean>>, boolean>>,
    Assert<IsExact<ValueOf<Dictionary<bigint>>, bigint>>,
    Assert<IsExact<ValueOf<Dictionary<symbol>>, symbol>>,
    Assert<IsExact<ValueOf<Dictionary<undefined>>, undefined>>,
    Assert<IsExact<ValueOf<Dictionary<null>>, null>>,
    Assert<IsExact<ValueOf<Dictionary<string, "a" | "b">>, string>>,
    Assert<IsExact<ValueOf<Dictionary<number, "a" | "b">>, number>>,
    Assert<IsExact<ValueOf<Dictionary<boolean, "a" | "b">>, boolean>>,
    Assert<IsExact<ValueOf<Dictionary<bigint, "a" | "b">>, bigint>>,
    Assert<IsExact<ValueOf<Dictionary<symbol, "a" | "b">>, symbol>>,
    Assert<IsExact<ValueOf<Dictionary<undefined, "a" | "b">>, undefined>>,
    Assert<IsExact<ValueOf<Dictionary<null, "a" | "b">>, null>>,
    Assert<IsExact<ValueOf<Dictionary<string, 1 | 2>>, string>>,
    Assert<IsExact<ValueOf<Dictionary<number, 1 | 2>>, number>>,
    Assert<IsExact<ValueOf<Dictionary<boolean, 1 | 2>>, boolean>>,
    Assert<IsExact<ValueOf<Dictionary<bigint, 1 | 2>>, bigint>>,
    Assert<IsExact<ValueOf<Dictionary<symbol, 1 | 2>>, symbol>>,
    Assert<IsExact<ValueOf<Dictionary<undefined, 1 | 2>>, undefined>>,
    Assert<IsExact<ValueOf<Dictionary<null, 1 | 2>>, null>>,
    Assert<IsExact<ValueOf<SafeDictionary<string>>, string | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<number>>, number | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<boolean>>, boolean | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<bigint>>, bigint | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<symbol>>, symbol | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<undefined>>, undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<null>>, null | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<string, "a" | "b">>, string | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<number, "a" | "b">>, number | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<boolean, "a" | "b">>, boolean | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<bigint, "a" | "b">>, bigint | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<symbol, "a" | "b">>, symbol | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<undefined, "a" | "b">>, undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<null, "a" | "b">>, null | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<string, 1 | 2>>, string | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<number, 1 | 2>>, number | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<boolean, 1 | 2>>, boolean | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<bigint, 1 | 2>>, bigint | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<symbol, 1 | 2>>, symbol | undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<undefined, 1 | 2>>, undefined>>,
    Assert<IsExact<ValueOf<SafeDictionary<null, 1 | 2>>, null | undefined>>,
  ];
}
