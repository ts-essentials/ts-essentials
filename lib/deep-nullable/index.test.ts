import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepNullable } from "..";
import { ComplexNestedRequired } from "../test-types";

type ComplexNestedNullable = {
  simple: number | null;
  nested: {
    date: Date | null;
    func: (() => string) | null;
    array: { bar: number | null }[];
    tuple: [string | null, number | null, { good: boolean | null } | null];
    set: Set<{ name: string | null }>;
    map: Map<string | null, { name: string | null }>;
    promise: Promise<{ foo: string | null; bar: number | null }>;
  };
};

function testDeepNullable() {
  type cases = [
    Assert<IsExact<DeepNullable<number>, number | null>>,
    Assert<IsExact<DeepNullable<string>, string | null>>,
    Assert<IsExact<DeepNullable<boolean>, boolean | null>>,
    Assert<IsExact<DeepNullable<bigint>, bigint | null>>,
    Assert<IsExact<DeepNullable<symbol>, symbol | null>>,
    Assert<IsExact<DeepNullable<undefined>, undefined | null>>,
    Assert<IsExact<DeepNullable<null>, null>>,
    Assert<IsExact<DeepNullable<Function>, Function | null>>,
    Assert<IsExact<DeepNullable<Date>, Date | null>>,
    Assert<IsExact<DeepNullable<Error>, Error | null>>,
    Assert<IsExact<DeepNullable<RegExp>, RegExp | null>>,
    Assert<IsExact<DeepNullable<Map<string, boolean>>, Map<string | null, boolean | null>>>,
    Assert<IsExact<DeepNullable<Map<string, { a: number }>>, Map<string | null, { a: number | null }>>>,
    Assert<IsExact<DeepNullable<ReadonlyMap<string, boolean>>, ReadonlyMap<string | null, boolean | null>>>,
    Assert<
      IsExact<
        DeepNullable<ReadonlyMap<string, { checked: boolean }>>,
        ReadonlyMap<string | null, { checked: boolean | null }>
      >
    >,
    Assert<IsExact<DeepNullable<WeakMap<{ key: string }, boolean>>, WeakMap<{ key: string | null }, boolean | null>>>,
    Assert<
      IsExact<
        DeepNullable<WeakMap<{ key: string }, { value: boolean }>>,
        WeakMap<{ key: string | null }, { value: boolean | null }>
      >
    >,
    Assert<IsExact<DeepNullable<Set<string>>, Set<string | null>>>,
    Assert<IsExact<DeepNullable<Set<number[]>>, Set<(number | null)[]>>>,
    Assert<IsExact<DeepNullable<Set<readonly number[]>>, Set<readonly (number | null)[]>>>,
    Assert<IsExact<DeepNullable<ReadonlySet<string>>, ReadonlySet<string | null>>>,
    Assert<IsExact<DeepNullable<WeakSet<{ a: string }>>, WeakSet<{ a: string | null }>>>,
    Assert<IsExact<DeepNullable<[]>, []>>,
    Assert<IsExact<DeepNullable<readonly []>, readonly []>>,
    Assert<IsExact<DeepNullable<never[]>, null[]>>,
    Assert<IsExact<DeepNullable<readonly never[]>, readonly null[]>>,
    Assert<IsExact<DeepNullable<[1, 2, 3]>, [1 | null, 2 | null, 3 | null]>>,
    Assert<IsExact<DeepNullable<readonly [1, 2, 3]>, readonly [1 | null, 2 | null, 3 | null]>>,
    Assert<IsExact<DeepNullable<number[]>, (number | null)[]>>,
    Assert<IsExact<DeepNullable<readonly number[]>, readonly (number | null)[]>>,
    Assert<IsExact<DeepNullable<Array<number>>, Array<number | null>>>,
    Assert<IsExact<DeepNullable<ReadonlyArray<number>>, ReadonlyArray<number | null>>>,
    Assert<IsExact<DeepNullable<Promise<number>>, Promise<number | null>>>,
    Assert<
      IsExact<
        DeepNullable<Promise<{ api: () => { play: () => void; pause: () => void } }>>,
        Promise<{ api: (() => { play: () => void; pause: () => void }) | null }>
      >
    >,
    Assert<IsExact<DeepNullable<{ a: 1; b: 2; c: 3 }>, { a: 1 | null; b: 2 | null; c: 3 | null }>>,
    Assert<IsExact<DeepNullable<{ foo: () => void }>, { foo: (() => void) | null }>>,
    Assert<IsExact<DeepNullable<{ foo: never }>, { foo: null }>>,
    Assert<IsExact<DeepNullable<ComplexNestedRequired>, ComplexNestedNullable>>,
    Assert<IsExact<DeepNullable<never>, null>>,
  ];
}
