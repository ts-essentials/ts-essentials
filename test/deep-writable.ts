import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepReadonly, DeepWritable } from "../lib";
import { ComplexNestedRequired, ComplexNestedReadonly } from "./types";

function testDeepWritable() {
  interface ExtendedFunction extends Function {
    args: 0;
  }

  interface ExtendedDate extends Date {
    today(): number;
  }

  interface ExtendedError extends Error {
    code: string;
  }

  interface ExtendedRegExp extends RegExp {
    caseSensitive: true;
  }

  type cases = [
    Assert<IsExact<DeepWritable<number>, number>>,
    Assert<IsExact<DeepWritable<string>, string>>,
    Assert<IsExact<DeepWritable<boolean>, boolean>>,
    Assert<IsExact<DeepWritable<bigint>, bigint>>,
    Assert<IsExact<DeepWritable<symbol>, symbol>>,
    Assert<IsExact<DeepWritable<undefined>, undefined>>,
    Assert<IsExact<DeepWritable<null>, null>>,
    Assert<IsExact<DeepWritable<Function>, Function>>,
    Assert<IsExact<DeepWritable<ExtendedFunction>, ExtendedFunction>>,
    Assert<IsExact<DeepWritable<Date>, Date>>,
    Assert<IsExact<DeepWritable<ExtendedDate>, ExtendedDate>>,
    Assert<IsExact<DeepWritable<Error>, Error>>,
    Assert<IsExact<DeepWritable<ExtendedError>, ExtendedError>>,
    Assert<IsExact<DeepWritable<RegExp>, RegExp>>,
    Assert<IsExact<DeepWritable<ExtendedRegExp>, ExtendedRegExp>>,
    Assert<IsExact<DeepWritable<Map<string, boolean>>, Map<string, boolean>>>,
    Assert<IsExact<DeepWritable<Map<string, { readonly a: number }>>, Map<string, { a: number }>>>,
    Assert<IsExact<DeepWritable<ReadonlyMap<string, boolean>>, Map<string, boolean>>>,
    Assert<
      IsExact<DeepWritable<ReadonlyMap<string, { readonly checked: boolean }>>, Map<string, { checked: boolean }>>
    >,
    Assert<IsExact<DeepWritable<WeakMap<{ key: string }, boolean>>, WeakMap<{ key: string }, boolean>>>,
    Assert<
      IsExact<
        DeepWritable<WeakMap<{ readonly key: string }, { readonly value: boolean }>>,
        WeakMap<{ key: string }, { value: boolean }>
      >
    >,
    Assert<IsExact<DeepWritable<Set<string>>, Set<string>>>,
    Assert<IsExact<DeepWritable<Set<readonly number[]>>, Set<number[]>>>,
    Assert<IsExact<DeepWritable<ReadonlySet<string>>, Set<string>>>,
    Assert<IsExact<DeepWritable<[]>, []>>,
    Assert<IsExact<DeepWritable<readonly []>, []>>,
    Assert<IsExact<DeepWritable<[1, 2, 3]>, [1, 2, 3]>>,
    Assert<IsExact<DeepWritable<readonly [1, 2, 3]>, [1, 2, 3]>>,
    Assert<IsExact<DeepWritable<number[]>, number[]>>,
    Assert<IsExact<DeepWritable<readonly number[]>, number[]>>,
    Assert<IsExact<DeepWritable<ReadonlyArray<number>>, Array<number>>>,
    Assert<IsExact<DeepWritable<Promise<number>>, Promise<number>>>,
    Assert<
      IsExact<
        DeepWritable<Promise<{ readonly api: () => { readonly play: () => void; readonly pause: () => void } }>>,
        Promise<{ api: () => { play: () => void; pause: () => void } }>
      >
    >,
    Assert<IsExact<DeepWritable<{ readonly a: 1; readonly b: 2; readonly c: 3 }>, { a: 1; b: 2; c: 3 }>>,
    Assert<IsExact<DeepWritable<{ foo: () => void }>, { foo: () => void }>>,
    Assert<
      IsExact<
        DeepWritable<{ readonly obj: unknown; readonly arr: readonly unknown[] }>,
        { obj: unknown; arr: unknown[] }
      >
    >,
    Assert<IsExact<DeepWritable<ComplexNestedReadonly>, ComplexNestedRequired>>,
    Assert<IsExact<DeepWritable<DeepReadonly<ComplexNestedRequired>>, ComplexNestedRequired>>,
    Assert<IsExact<DeepWritable<ComplexNestedRequired>, ComplexNestedRequired>>,
  ];

  {
    type Test = { readonly foo: string; bar: { readonly x: number } }[];

    const test: DeepWritable<Test> = [
      {
        foo: "a",
        bar: {
          x: 5,
        },
      },
    ];

    test[0].foo = "b";
    test[0].bar.x = 2;
  }
}
