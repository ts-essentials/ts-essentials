import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepUndefinable } from "..";
import { ComplexNestedRequired } from "../test-types";

type ComplexNestedUndefinable = {
  simple: number | undefined;
  nested: {
    date: Date | undefined;
    func: (() => string) | undefined;
    array: { bar: number | undefined }[];
    tuple: [string | undefined, number | undefined, { good: boolean | undefined } | undefined];
    set: Set<{ name: string | undefined }>;
    map: Map<string | undefined, { name: string | undefined }>;
    promise: Promise<{ foo: string | undefined; bar: number | undefined }>;
  };
};

function testDeepUndefinable() {
  type cases = [
    Assert<IsExact<DeepUndefinable<number>, number | undefined>>,
    Assert<IsExact<DeepUndefinable<string>, string | undefined>>,
    Assert<IsExact<DeepUndefinable<boolean>, boolean | undefined>>,
    Assert<IsExact<DeepUndefinable<bigint>, bigint | undefined>>,
    Assert<IsExact<DeepUndefinable<symbol>, symbol | undefined>>,
    Assert<IsExact<DeepUndefinable<undefined>, undefined>>,
    Assert<IsExact<DeepUndefinable<null>, null | undefined>>,
    Assert<IsExact<DeepUndefinable<Function>, Function | undefined>>,
    Assert<IsExact<DeepUndefinable<Date>, Date | undefined>>,
    Assert<IsExact<DeepUndefinable<Error>, Error | undefined>>,
    Assert<IsExact<DeepUndefinable<RegExp>, RegExp | undefined>>,
    Assert<IsExact<DeepUndefinable<Map<string, boolean>>, Map<string | undefined, boolean | undefined>>>,
    Assert<IsExact<DeepUndefinable<Map<string, { a: number }>>, Map<string | undefined, { a: number | undefined }>>>,
    Assert<
      IsExact<DeepUndefinable<ReadonlyMap<string, boolean>>, ReadonlyMap<string | undefined, boolean | undefined>>
    >,
    Assert<
      IsExact<
        DeepUndefinable<ReadonlyMap<string, { checked: boolean }>>,
        ReadonlyMap<string | undefined, { checked: boolean | undefined }>
      >
    >,
    Assert<
      IsExact<
        DeepUndefinable<WeakMap<{ key: string }, boolean>>,
        WeakMap<{ key: string | undefined }, boolean | undefined>
      >
    >,
    Assert<
      IsExact<
        DeepUndefinable<WeakMap<{ key: string }, { value: boolean }>>,
        WeakMap<{ key: string | undefined }, { value: boolean | undefined }>
      >
    >,
    Assert<IsExact<DeepUndefinable<Set<string>>, Set<string | undefined>>>,
    Assert<IsExact<DeepUndefinable<Set<number[]>>, Set<(number | undefined)[]>>>,
    Assert<IsExact<DeepUndefinable<Set<readonly number[]>>, Set<readonly (number | undefined)[]>>>,
    Assert<IsExact<DeepUndefinable<ReadonlySet<string>>, ReadonlySet<string | undefined>>>,
    Assert<IsExact<DeepUndefinable<WeakSet<{ a: string }>>, WeakSet<{ a: string | undefined }>>>,
    Assert<IsExact<DeepUndefinable<[]>, []>>,
    Assert<IsExact<DeepUndefinable<readonly []>, readonly []>>,
    Assert<IsExact<DeepUndefinable<never[]>, undefined[]>>,
    Assert<IsExact<DeepUndefinable<readonly never[]>, readonly undefined[]>>,
    Assert<IsExact<DeepUndefinable<[1, 2, 3]>, [1 | undefined, 2 | undefined, 3 | undefined]>>,
    Assert<IsExact<DeepUndefinable<readonly [1, 2, 3]>, readonly [1 | undefined, 2 | undefined, 3 | undefined]>>,
    Assert<IsExact<DeepUndefinable<number[]>, (number | undefined)[]>>,
    Assert<IsExact<DeepUndefinable<readonly number[]>, readonly (number | undefined)[]>>,
    Assert<IsExact<DeepUndefinable<Array<number>>, Array<number | undefined>>>,
    Assert<IsExact<DeepUndefinable<ReadonlyArray<number>>, ReadonlyArray<number | undefined>>>,
    Assert<IsExact<DeepUndefinable<Promise<number>>, Promise<number | undefined>>>,
    Assert<
      IsExact<
        DeepUndefinable<Promise<{ api: () => { play: () => void; pause: () => void } }>>,
        Promise<{ api: (() => { play: () => void; pause: () => void }) | undefined }>
      >
    >,
    Assert<IsExact<DeepUndefinable<{ a: 1; b: 2; c: 3 }>, { a: 1 | undefined; b: 2 | undefined; c: 3 | undefined }>>,
    Assert<IsExact<DeepUndefinable<{ foo: () => void }>, { foo: (() => void) | undefined }>>,
    Assert<IsExact<DeepUndefinable<{ foo: never }>, { foo: undefined }>>,
    Assert<IsExact<DeepUndefinable<ComplexNestedRequired>, ComplexNestedUndefinable>>,
    Assert<IsExact<DeepUndefinable<never>, undefined>>,
  ];
}
