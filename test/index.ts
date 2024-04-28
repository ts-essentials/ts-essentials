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
  DictionaryValues,
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
  IsTuple,
  Writable,
  OmitProperties,
  IsUnknown,
  IsNever,
  ArrayOrSingle,
  IsAny,
  NonEmptyArray,
  KeyofBase,
} from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";
import { TsVersion } from "./ts-version";

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

function testDictionaryValues() {
  type cases = [
    Assert<IsExact<DictionaryValues<Dictionary<string>>, string>>,
    Assert<IsExact<DictionaryValues<Dictionary<number>>, number>>,
    Assert<IsExact<DictionaryValues<Dictionary<boolean>>, boolean>>,
    Assert<IsExact<DictionaryValues<Dictionary<bigint>>, bigint>>,
    Assert<IsExact<DictionaryValues<Dictionary<symbol>>, symbol>>,
    Assert<IsExact<DictionaryValues<Dictionary<undefined>>, undefined>>,
    Assert<IsExact<DictionaryValues<Dictionary<null>>, null>>,
    Assert<IsExact<DictionaryValues<Dictionary<string, "a" | "b">>, string>>,
    Assert<IsExact<DictionaryValues<Dictionary<number, "a" | "b">>, number>>,
    Assert<IsExact<DictionaryValues<Dictionary<boolean, "a" | "b">>, boolean>>,
    Assert<IsExact<DictionaryValues<Dictionary<bigint, "a" | "b">>, bigint>>,
    Assert<IsExact<DictionaryValues<Dictionary<symbol, "a" | "b">>, symbol>>,
    Assert<IsExact<DictionaryValues<Dictionary<undefined, "a" | "b">>, undefined>>,
    Assert<IsExact<DictionaryValues<Dictionary<null, "a" | "b">>, null>>,
    Assert<IsExact<DictionaryValues<Dictionary<string, 1 | 2>>, string>>,
    Assert<IsExact<DictionaryValues<Dictionary<number, 1 | 2>>, number>>,
    Assert<IsExact<DictionaryValues<Dictionary<boolean, 1 | 2>>, boolean>>,
    Assert<IsExact<DictionaryValues<Dictionary<bigint, 1 | 2>>, bigint>>,
    Assert<IsExact<DictionaryValues<Dictionary<symbol, 1 | 2>>, symbol>>,
    Assert<IsExact<DictionaryValues<Dictionary<undefined, 1 | 2>>, undefined>>,
    Assert<IsExact<DictionaryValues<Dictionary<null, 1 | 2>>, null>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<string>>, string | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<number>>, number | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<boolean>>, boolean | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<bigint>>, bigint | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<symbol>>, symbol | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<undefined>>, undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<null>>, null | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<string, "a" | "b">>, string | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<number, "a" | "b">>, number | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<boolean, "a" | "b">>, boolean | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<bigint, "a" | "b">>, bigint | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<symbol, "a" | "b">>, symbol | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<undefined, "a" | "b">>, undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<null, "a" | "b">>, null | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<string, 1 | 2>>, string | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<number, 1 | 2>>, number | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<boolean, 1 | 2>>, boolean | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<bigint, 1 | 2>>, bigint | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<symbol, 1 | 2>>, symbol | undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<undefined, 1 | 2>>, undefined>>,
    Assert<IsExact<DictionaryValues<SafeDictionary<null, 1 | 2>>, null | undefined>>,
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
    Assert<IsExact<DeepNullable<ComplexNestedRequired>, ComplexNestedNullable>>,
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
    Assert<IsExact<DeepUndefinable<ComplexNestedRequired>, ComplexNestedUndefinable>>,
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
    // @ts-expect-error converts to Number and gets its optional keys
    Assert<IsExact<OptionalKeys<number>, never>>,
    // @ts-expect-error converts to String and gets its optional keys
    Assert<IsExact<OptionalKeys<string>, never>>,
    // wtf?
    Assert<IsExact<OptionalKeys<boolean>, () => boolean>>,
    // @ts-expect-error converts to BigInt and gets its optional keys
    Assert<IsExact<OptionalKeys<bigint>, never>>,
    // wtf?
    Assert<IsExact<OptionalKeys<symbol>, string | ((hint: string) => symbol) | (() => string) | (() => symbol)>>,
    Assert<IsExact<OptionalKeys<undefined>, never>>,
    Assert<IsExact<OptionalKeys<null>, never>>,
    Assert<IsExact<OptionalKeys<Function>, never>>,
    Assert<IsExact<OptionalKeys<Date>, never>>,
    Assert<IsExact<OptionalKeys<Error>, "stack">>,
    Assert<IsExact<OptionalKeys<RegExp>, never>>,
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
    Assert<IsExact<RequiredKeys<string>, SymbolConstructor["iterator"]>>,
    Assert<IsExact<RequiredKeys<boolean>, keyof Boolean>>,
    Assert<IsExact<RequiredKeys<bigint>, keyof BigInt>>,
    Assert<IsExact<RequiredKeys<symbol>, typeof Symbol.toPrimitive | typeof Symbol.toStringTag>>,
    Assert<IsExact<RequiredKeys<undefined>, never>>,
    Assert<IsExact<RequiredKeys<null>, never>>,
    Assert<IsExact<RequiredKeys<Function>, keyof Function>>,
    Assert<IsExact<RequiredKeys<Date>, keyof Date>>,
    Assert<IsExact<RequiredKeys<Error>, "name" | "message">>,
    Assert<IsExact<RequiredKeys<RegExp>, keyof RegExp>>,
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
  type T = { readonly a: number; b: string };

  type Actual = ReadonlyKeys<T>;

  type Expected = "a";

  type Test = Assert<IsExact<Actual, Expected>>;
}

function testWritableKeys() {
  type T = { readonly a: number; b: string };

  type Actual = WritableKeys<T>;

  type Expected = "b";

  type Test = Assert<IsExact<Actual, Expected>>;
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

function testHeadTail() {
  type List1 = [number, string, boolean, "a" | "b"];

  type TestHead = Assert<IsExact<Head<List1>, number>>;
  type TestHeadOnEmpty = Assert<IsExact<Head<[]>, never>>;

  type TestTail = Assert<IsExact<Tail<List1>, [string, boolean, "a" | "b"]>>;
  type TestTailOnEmpty = Assert<IsExact<Tail<[]>, never>>;
  type TestTailOn1Elem = Assert<IsExact<Tail<[number]>, []>>;
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

function testIsTuple() {
  type cases = [
    Assert<IsExact<IsTuple<string>, never>>,
    Assert<IsExact<IsTuple<number>, never>>,
    Assert<IsExact<IsTuple<boolean>, never>>,
    Assert<IsExact<IsTuple<undefined>, never>>,
    Assert<IsExact<IsTuple<null>, never>>,
    Assert<IsExact<IsTuple<{ a: 1 }>, never>>,
    Assert<IsExact<IsTuple<[1]>, [1]>>,
    Assert<IsExact<IsTuple<[1, 2]>, [1, 2]>>,
    Assert<IsExact<IsTuple<[1, 2, 3]>, [1, 2, 3]>>,
    Assert<IsExact<IsTuple<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Assert<IsExact<IsTuple<[1, 2, 3, 4, 5]>, [1, 2, 3, 4, 5]>>,
    Assert<IsExact<IsTuple<[1, 2, 3, 4, 5, 6]>, [1, 2, 3, 4, 5, 6]>>,
    Assert<IsExact<IsTuple<[1, 2, 3, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
    Assert<IsExact<IsTuple<[1, 2, 3, 4, 5, 6, 7, 8]>, [1, 2, 3, 4, 5, 6, 7, 8]>>,
    Assert<IsExact<IsTuple<[1, 2, 3, 4, 5, 6, 7, 8, 9]>, [1, 2, 3, 4, 5, 6, 7, 8, 9]>>,
    Assert<IsExact<IsTuple<[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>>,
    Assert<IsExact<IsTuple<readonly [1]>, readonly [1]>>,
    Assert<IsExact<IsTuple<readonly [1, 2]>, readonly [1, 2]>>,
    Assert<IsExact<IsTuple<readonly [1, 2, 3]>, readonly [1, 2, 3]>>,
    Assert<IsExact<IsTuple<readonly [1, 2, 3, 4]>, readonly [1, 2, 3, 4]>>,
    Assert<IsExact<IsTuple<readonly [1, 2, 3, 4, 5]>, readonly [1, 2, 3, 4, 5]>>,
    Assert<IsExact<IsTuple<readonly [1, 2, 3, 4, 5, 6]>, readonly [1, 2, 3, 4, 5, 6]>>,
    Assert<IsExact<IsTuple<readonly [1, 2, 3, 4, 5, 6, 7]>, readonly [1, 2, 3, 4, 5, 6, 7]>>,
    Assert<IsExact<IsTuple<readonly [1, 2, 3, 4, 5, 6, 7, 8]>, readonly [1, 2, 3, 4, 5, 6, 7, 8]>>,
    Assert<IsExact<IsTuple<readonly [1, 2, 3, 4, 5, 6, 7, 8, 9]>, readonly [1, 2, 3, 4, 5, 6, 7, 8, 9]>>,
    Assert<IsExact<IsTuple<readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>, readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>>,
    Assert<IsExact<IsTuple<number[]>, never>>,
    Assert<IsExact<IsTuple<readonly number[]>, never>>,
    Assert<IsExact<IsTuple<Array<number>>, never>>,
    Assert<IsExact<IsTuple<ReadonlyArray<number>>, never>>,
    Assert<IsExact<IsTuple<{ length: 3 }>, never>>,
  ];
}

function testIsUnknown() {
  type cases = [
    Assert<IsExact<IsUnknown<string>, false>>,
    Assert<IsExact<IsUnknown<number>, false>>,
    Assert<IsExact<IsUnknown<boolean>, false>>,
    Assert<IsExact<IsUnknown<bigint>, false>>,
    Assert<IsExact<IsUnknown<symbol>, false>>,
    Assert<IsExact<IsUnknown<undefined>, false>>,
    Assert<IsExact<IsUnknown<null>, false>>,
    Assert<IsExact<IsUnknown<Function>, false>>,
    Assert<IsExact<IsUnknown<Date>, false>>,
    Assert<IsExact<IsUnknown<Error>, false>>,
    Assert<IsExact<IsUnknown<RegExp>, false>>,
    Assert<IsExact<IsUnknown<Map<string, unknown>>, false>>,
    Assert<IsExact<IsUnknown<ReadonlyMap<string, unknown>>, false>>,
    Assert<IsExact<IsUnknown<WeakMap<{ a: 1 }, unknown>>, false>>,
    Assert<IsExact<IsUnknown<Set<string>>, false>>,
    Assert<IsExact<IsUnknown<ReadonlySet<string>>, false>>,
    Assert<IsExact<IsUnknown<WeakSet<{ a: 1 }>>, false>>,
    Assert<IsExact<IsUnknown<{ a: 1 }>, false>>,
    Assert<IsExact<IsUnknown<[]>, false>>,
    Assert<IsExact<IsUnknown<[1]>, false>>,
    Assert<IsExact<IsUnknown<readonly [1]>, false>>,
    Assert<IsExact<IsUnknown<readonly number[]>, false>>,
    Assert<IsExact<IsUnknown<number[]>, false>>,
    Assert<IsExact<IsUnknown<Promise<number>>, false>>,
    Assert<IsExact<IsUnknown<unknown>, true>>,
    Assert<IsExact<IsUnknown<never>, false>>,
    Assert<IsExact<IsUnknown<any>, false>>,
  ];
}

function testIsNever() {
  type cases = [
    Assert<IsExact<IsNever<string>, false>>,
    Assert<IsExact<IsNever<number>, false>>,
    Assert<IsExact<IsNever<boolean>, false>>,
    Assert<IsExact<IsNever<bigint>, false>>,
    Assert<IsExact<IsNever<symbol>, false>>,
    Assert<IsExact<IsNever<undefined>, false>>,
    Assert<IsExact<IsNever<null>, false>>,
    Assert<IsExact<IsNever<Function>, false>>,
    Assert<IsExact<IsNever<Date>, false>>,
    Assert<IsExact<IsNever<Error>, false>>,
    Assert<IsExact<IsNever<RegExp>, false>>,
    Assert<IsExact<IsNever<Map<string, unknown>>, false>>,
    Assert<IsExact<IsNever<ReadonlyMap<string, unknown>>, false>>,
    Assert<IsExact<IsNever<WeakMap<{ a: 1 }, unknown>>, false>>,
    Assert<IsExact<IsNever<Set<string>>, false>>,
    Assert<IsExact<IsNever<ReadonlySet<string>>, false>>,
    Assert<IsExact<IsNever<WeakSet<{ a: 1 }>>, false>>,
    Assert<IsExact<IsNever<{ a: 1 }>, false>>,
    Assert<IsExact<IsNever<[]>, false>>,
    Assert<IsExact<IsNever<[1]>, false>>,
    Assert<IsExact<IsNever<readonly [1]>, false>>,
    Assert<IsExact<IsNever<readonly number[]>, false>>,
    Assert<IsExact<IsNever<number[]>, false>>,
    Assert<IsExact<IsNever<Promise<number>>, false>>,
    Assert<IsExact<IsNever<unknown>, false>>,
    Assert<IsExact<IsNever<never>, true>>,
    Assert<IsExact<IsNever<any>, false>>,
  ];
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

function testIsAny() {
  type cases = [
    Assert<IsExact<IsAny<string>, false>>,
    Assert<IsExact<IsAny<number>, false>>,
    Assert<IsExact<IsAny<boolean>, false>>,
    Assert<IsExact<IsAny<bigint>, false>>,
    Assert<IsExact<IsAny<symbol>, false>>,
    Assert<IsExact<IsAny<undefined>, false>>,
    Assert<IsExact<IsAny<null>, false>>,
    Assert<IsExact<IsAny<Function>, false>>,
    Assert<IsExact<IsAny<Date>, false>>,
    Assert<IsExact<IsAny<Error>, false>>,
    Assert<IsExact<IsAny<RegExp>, false>>,
    Assert<IsExact<IsAny<Map<string, unknown>>, false>>,
    Assert<IsExact<IsAny<ReadonlyMap<string, unknown>>, false>>,
    Assert<IsExact<IsAny<WeakMap<{ a: 1 }, unknown>>, false>>,
    Assert<IsExact<IsAny<Set<string>>, false>>,
    Assert<IsExact<IsAny<ReadonlySet<string>>, false>>,
    Assert<IsExact<IsAny<WeakSet<{ a: 1 }>>, false>>,
    Assert<IsExact<IsAny<{ a: 1 }>, false>>,
    Assert<IsExact<IsAny<[]>, false>>,
    Assert<IsExact<IsAny<[1]>, false>>,
    Assert<IsExact<IsAny<readonly [1]>, false>>,
    Assert<IsExact<IsAny<readonly number[]>, false>>,
    Assert<IsExact<IsAny<number[]>, false>>,
    Assert<IsExact<IsAny<Promise<number>>, false>>,
    Assert<IsExact<IsAny<unknown>, false>>,
    Assert<IsExact<IsAny<never>, false>>,
    Assert<IsExact<IsAny<any>, true>>,
  ];
}
