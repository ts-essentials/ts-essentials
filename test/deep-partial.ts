import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepPartial } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";

function testDeepPartial() {
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
    Assert<IsExact<DeepPartial<number>, number>>,
    Assert<IsExact<DeepPartial<string>, string>>,
    Assert<IsExact<DeepPartial<boolean>, boolean>>,
    Assert<IsExact<DeepPartial<bigint>, bigint>>,
    Assert<IsExact<DeepPartial<symbol>, symbol>>,
    Assert<IsExact<DeepPartial<undefined>, undefined>>,
    Assert<IsExact<DeepPartial<null>, null>>,
    Assert<IsExact<DeepPartial<Function>, Function>>,
    Assert<IsExact<DeepPartial<ExtendedFunction>, Function & { args: 0 }>>,
    Assert<IsExact<DeepPartial<Date>, Date>>,
    Assert<IsExact<DeepPartial<ExtendedDate>, Date & { today(): number }>>,
    Assert<IsExact<DeepPartial<Error>, Error>>,
    Assert<IsExact<DeepPartial<ExtendedError>, Error & { code: string }>>,
    Assert<IsExact<DeepPartial<RegExp>, RegExp>>,
    Assert<IsExact<DeepPartial<ExtendedRegExp>, RegExp & { caseSensitive: true }>>,
    Assert<IsExact<DeepPartial<Map<string, boolean>>, Map<string, boolean>>>,
    Assert<IsExact<DeepPartial<Map<string, { a: number }>>, Map<string, { a?: number }>>>,
    Assert<IsExact<DeepPartial<ReadonlyMap<string, boolean>>, ReadonlyMap<string, boolean>>>,
    Assert<IsExact<DeepPartial<ReadonlyMap<string, { checked: boolean }>>, ReadonlyMap<string, { checked?: boolean }>>>,
    Assert<IsExact<DeepPartial<WeakMap<{ key: string }, boolean>>, WeakMap<{ key?: string }, boolean>>>,
    Assert<
      IsExact<DeepPartial<WeakMap<{ key: string }, { value: boolean }>>, WeakMap<{ key?: string }, { value?: boolean }>>
    >,
    Assert<IsExact<DeepPartial<Set<string>>, Set<string>>>,
    Assert<IsExact<DeepPartial<Set<number[]>>, Set<(number | undefined)[]>>>,
    Assert<IsExact<DeepPartial<ReadonlySet<string>>, ReadonlySet<string>>>,
    Assert<IsExact<DeepPartial<[]>, []>>,
    Assert<IsExact<DeepPartial<never[]>, undefined[]>>,
    Assert<IsExact<DeepPartial<[1, 2, 3]>, [(1 | undefined)?, (2 | undefined)?, (3 | undefined)?]>>,
    Assert<IsExact<DeepPartial<readonly number[]>, readonly (number | undefined)[]>>,
    Assert<IsExact<DeepPartial<number[]>, (number | undefined)[]>>,
    Assert<IsExact<DeepPartial<Array<number>>, Array<number | undefined>>>,
    Assert<IsExact<DeepPartial<Promise<number>>, Promise<number>>>,
    Assert<
      IsExact<
        DeepPartial<Promise<{ api: () => { play: () => void; pause: () => void } }>>,
        Promise<{ api?: () => { play: () => void; pause: () => void } }>
      >
    >,
    Assert<
      IsExact<
        DeepPartial<{ readonly obj: unknown; readonly arr: readonly unknown[] }>,
        {
          readonly obj?: unknown | undefined;
          readonly arr?: readonly unknown[] | undefined;
        }
      >
    >,
    Assert<IsExact<DeepPartial<{ a: 1; b: 2; c: 3 }>, { a?: 1; b?: 2; c?: 3 }>>,
    Assert<IsExact<DeepPartial<{ foo: () => void }>, { foo?: () => void }>>,
    Assert<IsExact<DeepPartial<ComplexNestedRequired>, ComplexNestedPartial>>,
  ];
}
