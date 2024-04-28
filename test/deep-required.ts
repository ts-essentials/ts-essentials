import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepPartial, DeepRequired } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";

function testDeepRequired() {
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

  interface ExtendedArray<T> extends Array<T> {}

  interface ExtendedReadonlyArray<T> extends ReadonlyArray<T> {}

  type cases = [
    Assert<IsExact<DeepRequired<number | null | undefined>, number | null | undefined>>,
    Assert<IsExact<DeepRequired<string | null | undefined>, string | null | undefined>>,
    Assert<IsExact<DeepRequired<boolean | null | undefined>, boolean | null | undefined>>,
    Assert<IsExact<DeepRequired<bigint | null | undefined>, bigint | null | undefined>>,
    Assert<IsExact<DeepRequired<symbol | null | undefined>, symbol | null | undefined>>,
    Assert<IsExact<DeepRequired<undefined | null>, undefined | null>>,
    Assert<IsExact<DeepRequired<Function | null | undefined>, Function | null | undefined>>,
    Assert<IsExact<DeepRequired<DeepPartial<ExtendedFunction>>, ExtendedFunction>>,
    Assert<IsExact<DeepRequired<Date | null | undefined>, Date | null | undefined>>,
    Assert<IsExact<DeepRequired<DeepPartial<ExtendedDate>>, ExtendedDate>>,
    Assert<IsExact<DeepRequired<Error | null | undefined>, Required<Error> | null | undefined>>,
    Assert<IsExact<DeepRequired<DeepPartial<ExtendedError>>, Required<Error> & { code: string }>>,
    Assert<IsExact<DeepRequired<RegExp | null | undefined>, RegExp | null | undefined>>,
    Assert<IsExact<DeepRequired<DeepPartial<ExtendedRegExp>>, ExtendedRegExp>>,
    Assert<
      IsExact<
        DeepRequired<Map<string | null | undefined, boolean | null | undefined>>,
        Map<string | null | undefined, boolean | null | undefined>
      >
    >,
    Assert<
      IsExact<
        DeepRequired<Map<string | null | undefined, { a: number | null | undefined }>>,
        Map<string | null | undefined, { a: number | null | undefined }>
      >
    >,
    Assert<
      IsExact<
        DeepRequired<ReadonlyMap<string | null | undefined, boolean | null | undefined>>,
        ReadonlyMap<string | null | undefined, boolean | null | undefined>
      >
    >,
    Assert<
      IsExact<
        DeepRequired<ReadonlyMap<string | null | undefined, { checked: boolean | null | undefined }>>,
        ReadonlyMap<string | null | undefined, { checked: boolean | null | undefined }>
      >
    >,
    Assert<
      IsExact<
        DeepRequired<WeakMap<{ key: string | null | undefined }, boolean | null | undefined>>,
        WeakMap<{ key: string | null | undefined }, boolean | null | undefined>
      >
    >,
    Assert<
      IsExact<
        DeepRequired<WeakMap<{ key: string | null | undefined }, { value: boolean | null | undefined }>>,
        WeakMap<{ key: string | null | undefined }, { value: boolean | null | undefined }>
      >
    >,
    Assert<IsExact<DeepRequired<Set<string | null | undefined>>, Set<string | null | undefined>>>,
    Assert<IsExact<DeepRequired<Set<(number | null | undefined)[]>>, Set<(number | null)[]>>>,
    Assert<IsExact<DeepRequired<ReadonlySet<string | null | undefined>>, ReadonlySet<string | null | undefined>>>,
    Assert<IsExact<DeepRequired<[] | null | undefined>, [] | null | undefined>>,
    Assert<IsExact<DeepRequired<(null | undefined)[]>, null[]>>,
    Assert<
      IsExact<
        DeepRequired<[1 | null | undefined, 2 | null | undefined, 3 | null | undefined]>,
        [1 | null | undefined, 2 | null | undefined, 3 | null | undefined]
      >
    >,
    Assert<
      IsExact<
        DeepRequired<[(1 | null | undefined)?, (2 | null | undefined)?, (3 | null | undefined)?]>,
        [1 | null, 2 | null, 3 | null]
      >
    >,
    Assert<IsExact<DeepRequired<readonly (number | null | undefined)[]>, readonly (number | null)[]>>,
    Assert<IsExact<DeepRequired<Array<number | null | undefined>>, Array<number | null>>>,
    Assert<IsExact<DeepRequired<ReadonlyArray<number | null | undefined>>, ReadonlyArray<number | null>>>,
    Assert<IsExact<DeepRequired<ExtendedArray<number | null | undefined>>, Array<number | null>>>,
    Assert<IsExact<DeepRequired<ExtendedReadonlyArray<number | null | undefined>>, ReadonlyArray<number | null>>>,
    Assert<IsExact<DeepRequired<Promise<number | null | undefined>>, Promise<number | null | undefined>>>,
    Assert<
      IsExact<
        DeepRequired<Promise<{ api: (() => { play: () => void; pause: () => void }) | null | undefined }>>,
        Promise<{
          api:
            | (() => {
                play: () => void;
                pause: () => void;
              })
            | null
            | undefined;
        }>
      >
    >,
    Assert<
      IsExact<
        DeepRequired<{ a: 1 | null | undefined; b: 2 | null | undefined; c: 3 | null | undefined }>,
        { a: 1 | null | undefined; b: 2 | null | undefined; c: 3 | null | undefined }
      >
    >,
    Assert<IsExact<DeepRequired<{ foo: (() => void) | null | undefined }>, { foo: (() => void) | null | undefined }>>,
    Assert<IsExact<DeepRequired<{ a?: 1; b?: 2 }>, { a: 1; b: 2 }>>,
    Assert<IsExact<DeepRequired<ComplexNestedPartial>, ComplexNestedRequired>>,
  ];
}
