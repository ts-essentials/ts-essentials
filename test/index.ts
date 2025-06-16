/**
 * This file contains a lot of unused functions as it's only typechecked.
 */
import { AssertTrue as Assert, IsExact, AssertFalse } from "conditional-type-checks";

import {
  assert,
  Buildable,
  DeepNonNullable,
  DeepNullable,
  DeepReadonly,
  Dictionary,
  noop,
  PickProperties,
  ReadonlyKeys,
  SafeDictionary,
  Tuple,
  WritableKeys,
  Head,
  Tail,
  Exact,
  ElementOf,
  DeepUndefinable,
  OptionalKeys,
  RequiredKeys,
  AsyncOrSyncType,
  AsyncOrSync,
  Awaited,
  Newable,
  Writable,
  OmitProperties,
  ArrayOrSingle,
  NonEmptyArray,
  KeyofBase,
} from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";

function testDictionary() {
  type cases = [
    Assert<IsExact<Dictionary<number>[string], number>>,
    Assert<IsExact<Dictionary<number>[number], number>>,
    // @ts-expect-error cannot use boolean as dictionary key
    Dictionary<number>[boolean],
    // @ts-expect-error cannot use bigint as dictionary key
    Dictionary<number>[bigint],
    // @ts-expect-error cannot use symbol as dictionary key
    Dictionary<number>[symbol],
    // @ts-expect-error cannot use undefined as dictionary key
    Dictionary<number>[undefined],
    // @ts-expect-error cannot use null as dictionary key
    Dictionary<number>[null],
    // @ts-expect-error cannot use string as only 'a' | 'b' allowed
    Assert<IsExact<Dictionary<number, "a" | "b">[string], number>>,
    Assert<IsExact<Dictionary<number, "a" | "b">["a"], number>>,
    Assert<IsExact<Dictionary<number, "a" | "b">["b"], number>>,
    Assert<IsExact<Dictionary<number, KeyofBase>[symbol], number>>,
  ];
}

function testSafeDictionary() {
  type cases = [
    Assert<IsExact<SafeDictionary<number>, { [x: string]: number | undefined }>>,
    Assert<IsExact<Pick<SafeDictionary<number>, "foo">, { foo: number | undefined }>>,
    Assert<IsExact<SafeDictionary<number>["foo"], number | undefined>>,
    Assert<IsExact<SafeDictionary<boolean, number>[42], boolean | undefined>>,
  ];

  const testingSafeDictionary: SafeDictionary<number> = {};
  delete testingSafeDictionary.unexistingField;
  testingSafeDictionary.existingField = 1;
  delete testingSafeDictionary.existingField;

  // non exhaustiveness
  const safeDict: SafeDictionary<string, "A" | "B"> = { A: "OK" };
}

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

type ComplexNestedNullableOrUndefined = {
  simple: number | null | undefined;
  nested: {
    date: Date | null | undefined;
    func: (() => string) | null | undefined;
    array: ({ bar: number | null | undefined } | null | undefined)[] | null | undefined;
    tuple:
      | [string | null | undefined, number | null | undefined, { good: boolean | null | undefined } | null | undefined]
      | null
      | undefined;
    set:
      | Set<
          | {
              name: string | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
    map:
      | Map<
          string | null | undefined,
          | {
              name: string | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
    promise:
      | Promise<
          | {
              foo: string | null | undefined;
              bar: number | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
  };
};

type ComplexNestedReadonly = {
  readonly simple: number;
  readonly nested: {
    readonly date: Date;
    readonly func: () => string;
    readonly array: readonly { readonly bar: number }[];
    readonly tuple: readonly [string, number, { readonly good: boolean }];
    readonly set: ReadonlySet<{
      readonly name: string;
    }>;
    readonly map: ReadonlyMap<
      string,
      {
        readonly name: string;
      }
    >;
    readonly promise: Promise<{ readonly foo: string; readonly bar: number }>;
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

function testDeepNonNullable() {
  type cases = [
    Assert<IsExact<DeepNonNullable<number | null | undefined>, number>>,
    Assert<IsExact<DeepNonNullable<string | null | undefined>, string>>,
    Assert<IsExact<DeepNonNullable<boolean | null | undefined>, boolean>>,
    Assert<IsExact<DeepNonNullable<bigint | null | undefined>, bigint>>,
    Assert<IsExact<DeepNonNullable<symbol | null | undefined>, symbol>>,
    Assert<IsExact<DeepNonNullable<undefined | null>, never>>,
    Assert<IsExact<DeepNonNullable<Function | null | undefined>, Function>>,
    Assert<IsExact<DeepNonNullable<Date | null | undefined>, Date>>,
    Assert<IsExact<DeepNonNullable<Error | null | undefined>, Error>>,
    Assert<IsExact<DeepNonNullable<RegExp | null | undefined>, RegExp>>,
    Assert<IsExact<DeepNonNullable<Map<string | null | undefined, boolean | null | undefined>>, Map<string, boolean>>>,
    Assert<
      IsExact<
        DeepNonNullable<Map<string | null | undefined, { a: number | null | undefined }>>,
        Map<string, { a: number }>
      >
    >,
    Assert<
      IsExact<
        DeepNonNullable<ReadonlyMap<string | null | undefined, boolean | null | undefined>>,
        ReadonlyMap<string, boolean>
      >
    >,
    Assert<
      IsExact<
        DeepNonNullable<ReadonlyMap<string | null | undefined, { checked: boolean | null | undefined }>>,
        ReadonlyMap<string, { checked: boolean }>
      >
    >,
    Assert<
      IsExact<
        DeepNonNullable<WeakMap<{ key: string | null | undefined }, boolean | null | undefined>>,
        WeakMap<{ key: string }, boolean>
      >
    >,
    Assert<
      IsExact<
        DeepNonNullable<WeakMap<{ key: string | null | undefined }, { value: boolean | null | undefined }>>,
        WeakMap<{ key: string }, { value: boolean }>
      >
    >,
    Assert<IsExact<DeepNonNullable<Set<string | null | undefined>>, Set<string>>>,
    Assert<IsExact<DeepNonNullable<Set<(number | null | undefined)[]>>, Set<number[]>>>,
    Assert<IsExact<DeepNonNullable<ReadonlySet<string | null | undefined>>, ReadonlySet<string>>>,
    Assert<IsExact<DeepNonNullable<[] | null | undefined>, []>>,
    Assert<IsExact<DeepNonNullable<(null | undefined)[]>, never[]>>,
    Assert<IsExact<DeepNonNullable<[1 | null | undefined, 2 | null | undefined, 3 | null | undefined]>, [1, 2, 3]>>,
    Assert<IsExact<DeepNonNullable<readonly (number | null | undefined)[]>, readonly number[]>>,
    Assert<IsExact<DeepNonNullable<Array<number | null | undefined>>, Array<number>>>,
    Assert<IsExact<DeepNonNullable<Promise<number | null | undefined>>, Promise<number>>>,
    Assert<
      IsExact<
        DeepNonNullable<Promise<{ api: (() => { play: () => void; pause: () => void }) | null | undefined }>>,
        Promise<{ api: () => { play: () => void; pause: () => void } }>
      >
    >,
    Assert<
      IsExact<
        DeepNonNullable<{ a: 1 | null | undefined; b: 2 | null | undefined; c: 3 | null | undefined }>,
        { a: 1; b: 2; c: 3 }
      >
    >,
    Assert<IsExact<DeepNonNullable<{ foo: (() => void) | null | undefined }>, { foo: () => void }>>,
    Assert<IsExact<DeepNonNullable<{ a?: 1; b?: 2 }>, { a?: 1 | undefined; b?: 2 | undefined }>>,
    Assert<IsExact<DeepNonNullable<ComplexNestedNullableOrUndefined>, ComplexNestedRequired>>,
  ];
}

function testWritable() {
  type cases = [
    Assert<IsExact<Writable<{}>, {}>>,
    Assert<IsExact<Writable<{ readonly a: number }>, { a: number }>>,
    Assert<IsExact<Writable<{ a: number }>, { a: number }>>,
    Assert<IsExact<Writable<[1, 2, 3]>, [1, 2, 3]>>,
    Assert<IsExact<Writable<readonly [1, 2, 3]>, [1, 2, 3]>>,
    Assert<IsExact<Writable<number[]>, number[]>>,
    Assert<IsExact<Writable<readonly number[]>, number[]>>,
  ];
}

function testBuildable() {
  type cases = [
    Assert<IsExact<Buildable<number>, number>>,
    Assert<IsExact<Buildable<string>, string>>,
    Assert<IsExact<Buildable<boolean>, boolean>>,
    Assert<IsExact<Buildable<bigint>, bigint>>,
    Assert<IsExact<Buildable<symbol>, symbol>>,
    Assert<IsExact<Buildable<undefined>, undefined>>,
    Assert<IsExact<Buildable<null>, null>>,
    Assert<IsExact<Buildable<Function>, Function>>,
    Assert<IsExact<Buildable<Date>, Date>>,
    Assert<IsExact<Buildable<Error>, Partial<Error>>>,
    Assert<IsExact<Buildable<RegExp>, RegExp>>,
    Assert<IsExact<Buildable<Map<string, boolean>>, Map<string, boolean>>>,
    Assert<IsExact<Buildable<ReadonlyMap<string, boolean>>, Map<string, boolean>>>,
    Assert<IsExact<Buildable<WeakMap<{ key: string }, boolean>>, WeakMap<{ key: string }, boolean>>>,
    Assert<
      IsExact<Buildable<WeakMap<{ key: string }, { value: boolean }>>, WeakMap<{ key?: string }, { value?: boolean }>>
    >,
    Assert<IsExact<Buildable<Set<string>>, Set<string>>>,
    Assert<IsExact<Buildable<ReadonlySet<string>>, Set<string>>>,
    Assert<IsExact<Buildable<readonly []>, []>>,
    Assert<IsExact<Buildable<readonly [1, 2, 3]>, [(1 | undefined)?, (2 | undefined)?, (3 | undefined)?]>>,
    Assert<IsExact<Buildable<readonly number[]>, (number | undefined)[]>>,
    Assert<IsExact<Buildable<ReadonlyArray<number>>, Array<number | undefined>>>,
    Assert<IsExact<Buildable<Promise<number>>, Promise<number>>>,
    Assert<IsExact<Buildable<{ readonly a: 1; readonly b: 2; readonly c: 3 }>, { a?: 1; b?: 2; c?: 3 }>>,
    Assert<IsExact<Buildable<{ foo: () => void }>, { foo?: () => void }>>,
    Assert<
      IsExact<
        Buildable<{ readonly obj: unknown; readonly arr: readonly unknown[] }>,
        {
          obj?: unknown | undefined;
          arr?: unknown[] | undefined;
        }
      >
    >,
    Assert<IsExact<Buildable<DeepReadonly<ComplexNestedRequired>>, ComplexNestedPartial>>,
    Assert<IsExact<Buildable<ComplexNestedRequired>, ComplexNestedPartial>>,
    Assert<IsExact<Buildable<ComplexNestedReadonly>, ComplexNestedPartial>>,
  ];
}

function testOmitProperties() {
  type cases = [
    Assert<IsExact<OmitProperties<{}, never>, {}>>,
    Assert<IsExact<OmitProperties<{ a: 1 }, never>, { a: 1 }>>,
    Assert<IsExact<OmitProperties<{ a?: 1 }, never>, { a?: 1 }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, number>, { b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, number | undefined>, { b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, string>, { a: 1; b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, string | undefined>, { a: 1; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, boolean>, { a: 1; b?: "2" }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, boolean | undefined>, { a: 1; b?: "2" }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, undefined>, { a: 1; b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, boolean | string>, { a: 1; b?: "2" }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, number | boolean>, { b?: "2" }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, number | string>, { b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: string; b: number[] }, any[]>, { a: string }>>,
    Assert<IsExact<OmitProperties<{ a: string; b: number }, any[]>, { a: string; b: number }>>,
  ];
}

function testPickProperties() {
  type cases = [
    Assert<IsExact<PickProperties<{}, never>, {}>>,
    Assert<IsExact<PickProperties<{ a: 1 }, never>, {}>>,
    Assert<IsExact<PickProperties<{ a?: 1 }, never>, {}>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, number>, { a: 1 }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, number | undefined>, { a: 1 }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, string>, {}>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, string | undefined>, { b?: "2" }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, boolean>, { c: false }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, boolean | undefined>, { c: false }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, undefined>, {}>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, boolean | string>, { c: false }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, number | boolean>, { a: 1; c: false }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, number | string>, { a: 1 }>>,
    Assert<IsExact<PickProperties<{ a: string; b: number[] }, any[]>, { b: number[] }>>,
    Assert<IsExact<PickProperties<{ a: string; b: number }, any[]>, {}>>,
  ];
}

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

function testRequiredKeys() {
  type cases = [
    Assert<IsExact<RequiredKeys<number>, keyof Number>>,
    Assert<IsExact<RequiredKeys<string>, keyof string>>,
    Assert<IsExact<RequiredKeys<boolean>, keyof Boolean>>,
    Assert<IsExact<RequiredKeys<bigint>, keyof BigInt>>,
    Assert<IsExact<RequiredKeys<symbol>, keyof symbol>>,
    Assert<IsExact<RequiredKeys<undefined>, never>>,
    Assert<IsExact<RequiredKeys<null>, never>>,
    Assert<IsExact<RequiredKeys<Function>, keyof Function>>,
    Assert<IsExact<RequiredKeys<Date>, keyof Date>>,
    Assert<IsExact<RequiredKeys<Error>, "name" | "message">>,
    Assert<IsExact<RequiredKeys<RegExp>, keyof RegExp>>,
    Assert<IsExact<RequiredKeys<() => void>, never>>,
    Assert<IsExact<RequiredKeys<any[]>, keyof any[]>>,
    Assert<IsExact<RequiredKeys<[1, 2]>, keyof [1, 2]>>,
    Assert<IsExact<RequiredKeys<{ (): void; a?: 1 }>, never>>,
    Assert<IsExact<RequiredKeys<{ (): void; a: 1 }>, "a">>,
    Assert<IsExact<RequiredKeys<[1, 2?]>, Exclude<keyof [1, 2?], "1">>>,
    Assert<IsExact<RequiredKeys<{}>, never>>,
    Assert<IsExact<RequiredKeys<{ a: 1 }>, "a">>,
    Assert<IsExact<RequiredKeys<{ a?: 1 }>, never>>,
    Assert<IsExact<RequiredKeys<{ a: 1 | undefined }>, "a">>,
    Assert<IsExact<RequiredKeys<{ a: 1 | null }>, "a">>,
    Assert<IsExact<RequiredKeys<{ a?: 1 } | { b: 2 }>, "b">>,
    Assert<IsExact<RequiredKeys<{ a?: 1 } | { b?: 2 }>, never>>,
    Assert<IsExact<RequiredKeys<{ a?: 1 } | { b: 2 | undefined }>, "b">>,
    Assert<IsExact<RequiredKeys<{ a?: 1 } | { b: 2 | null }>, "b">>,
    Assert<IsExact<RequiredKeys<{ a: 1 } | { b: 2 }>, "a" | "b">>,
    Assert<IsExact<RequiredKeys<{ a: 1 } | { b?: 2 }>, "a">>,
    Assert<IsExact<RequiredKeys<{ a: 1 } | { b: 2 | undefined }>, "a" | "b">>,
    Assert<IsExact<RequiredKeys<{ a: 1 } | { b: 2 | null }>, "a" | "b">>,
  ];
}

function testTupleInference() {
  type Expected = [number, string];

  function returnTuple<T extends Tuple>(tuple: T) {
    return tuple;
  }

  const ret = returnTuple([1, "s"]);

  type Test = Assert<IsExact<typeof ret, Expected>>;
}

function testParametrizedTuple() {
  function acceptsCertainTuple<T extends Tuple<number | string>>(tuple: T) {
    return tuple;
  }

  acceptsCertainTuple([42, "foo"]);
}

function testNonEmptyArray() {
  type Cases<T> = [
    Assert<IsExact<NonEmptyArray<T>, [T, ...T[]]>>,
    AssertFalse<IsExact<NonEmptyArray<T>, []>>,

    AssertFalse<Assignable<NonEmptyArray<T>, []>>,
    Assert<Assignable<NonEmptyArray<T>, [T]>>,
    Assert<Assignable<NonEmptyArray<T>, [T, ...T[]]>>,
  ];
}

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

function testAssert() {
  type TestType1 = string | undefined;
  type Expected = string;
  const anything = undefined as any as TestType1;

  assert(anything);
  type Actual = typeof anything;
  type Test = Assert<IsExact<Actual, string>>;
}

function testNoop() {
  const x: void = noop();
  const y: void = noop(false, 0, "", {}, [], null, undefined, Promise.resolve(), new Error(), noop);
  const z: Promise<void> = Promise.resolve("foo").then(noop);
  const callback: (_: number) => void = noop;
}

function testHead() {
  type cases = [
    Assert<IsExact<Head<[]>, never>>,
    Assert<IsExact<Head<readonly []>, never>>,
    Assert<IsExact<Head<[1 | 2, 2, 3]>, 1 | 2>>,
    Assert<IsExact<Head<readonly [1 | 2, 2, 3]>, 1 | 2>>,
    Assert<IsExact<Head<[1]>, 1>>,
    Assert<IsExact<Head<[1?]>, 1 | undefined>>,
    Assert<IsExact<Head<[1, 2] | [3, 4, 5]>, 1 | 3>>,
    Assert<IsExact<Head<[1, 2] | []>, 1>>,
    Assert<IsExact<Head<[1?, 2?, 3?]>, 1 | undefined>>,
    Assert<IsExact<Head<[...number[], 1, 2]>, number>>,
    Assert<IsExact<Head<number[]>, number>>,
    Assert<IsExact<Head<any[]>, any>>,
    Assert<IsExact<Head<any>, any>>,
    Assert<IsExact<Head<never>, never>>,
  ];
}

function testTail() {
  type cases = [
    Assert<IsExact<Tail<[]>, never>>,
    Assert<IsExact<Tail<readonly []>, never>>,
    Assert<IsExact<Tail<[1, 2, 3 | 4]>, [2, 3 | 4]>>,
    Assert<IsExact<Tail<readonly [1, 2, 3 | 4]>, [2, 3 | 4]>>,
    Assert<IsExact<Tail<[1]>, []>>,
    Assert<IsExact<Tail<[1?]>, []>>,
    Assert<IsExact<Tail<[1, 2] | [3, 4, 5]>, [2] | [4, 5]>>,
    Assert<IsExact<Tail<[1, 2] | []>, [2]>>,
    Assert<IsExact<Tail<[1?, 2?, 3?]>, [2?, 3?]>>,
    Assert<IsExact<Tail<[1, 2, ...number[]]>, [2, ...number[]]>>,
    Assert<IsExact<Tail<number[]>, number[]>>,
    Assert<IsExact<Tail<readonly number[]>, number[]>>,
    Assert<IsExact<Tail<any[]>, any[]>>,
    Assert<IsExact<Tail<any>, unknown[]>>, // refer https://github.com/ts-essentials/ts-essentials/pull/424#discussion_r1867834519 for why it's unknown[]
    Assert<IsExact<Tail<never>, never>>,
  ];
}

function testExact() {
  type ABC = { a: number; b: number; c: number };
  type BC = { b: number; c: number };
  type C = { c: number };

  type a1 = Assert<IsExact<Exact<ABC, C>, never>>;
  type a2 = Assert<IsExact<Exact<BC, C>, never>>;
  type a3 = Assert<IsExact<Exact<C, C>, C>>;
}

function testElementOf() {
  const t1 = [1, 2, true, false];
  type a1 = Assert<IsExact<ElementOf<typeof t1>, number | boolean>>;
  const t2 = ["one"] as const;
  type a2 = Assert<IsExact<ElementOf<typeof t2>, "one">>;
}

// T = U
type Assignable<T, U> = U extends T ? true : false;

function testAsyncOrSyncType() {
  type cases = [
    Assert<IsExact<AsyncOrSyncType<AsyncOrSync<number>>, number>>,
    Assert<IsExact<AsyncOrSyncType<AsyncOrSync<AsyncOrSync<number>>>, AsyncOrSync<number>>>,
  ];
}

function testAwaitedType() {
  type t1 = Assert<IsExact<Awaited<Promise<number>>, number>>;
}

function testNewable() {
  class TestCls {
    constructor(arg1: string) {}
  }

  const t1: Newable<any> = TestCls;
}

function testArrayOrSingle() {
  const castArray = <T extends any>(value: ArrayOrSingle<T>): T[] => {
    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const numbers1 = castArray(1);
  const numbers2 = castArray([1]);
  const strings1 = castArray("hello");
  const strings2 = castArray(["hello"]);
  const booleans1 = castArray(false);
  const booleans2 = castArray([false]);
  const nulls1 = castArray(null);
  const nulls2 = castArray([null]);
  const undefined1 = castArray(undefined);
  const undefined2 = castArray([undefined]);

  type cases = [
    Assert<IsExact<ArrayOrSingle<never>, never | never[]>>,
    Assert<IsExact<ArrayOrSingle<string>, string | string[]>>,
    Assert<IsExact<ArrayOrSingle<1>, 1 | 1[]>>,
    Assert<IsExact<ArrayOrSingle<"1">, "1" | "1"[]>>,
    Assert<IsExact<ArrayOrSingle<string | number>, string | number | (string | number)[]>>,
    Assert<IsExact<ArrayOrSingle<{ a: number }>, { a: number } | { a: number }[]>>,
    Assert<IsExact<typeof numbers1, number[]>>,
    Assert<IsExact<typeof numbers2, number[]>>,
    Assert<IsExact<typeof strings1, string[]>>,
    Assert<IsExact<typeof strings2, string[]>>,
    Assert<IsExact<typeof booleans1, boolean[]>>,
    Assert<IsExact<typeof booleans2, boolean[]>>,
    Assert<IsExact<typeof nulls1, null[]>>,
    Assert<IsExact<typeof nulls2, null[]>>,
    Assert<IsExact<typeof undefined1, undefined[]>>,
    Assert<IsExact<typeof undefined2, undefined[]>>,
  ];
}
