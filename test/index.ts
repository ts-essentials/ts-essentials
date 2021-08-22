/**
 * This file contains a lot of unused functions as it's only typechecked.
 */
import { AssertTrue as Assert, IsExact, AssertFalse } from "conditional-type-checks";

import {
  assert,
  Buildable,
  DeepNonNullable,
  DeepNullable,
  DeepOmit,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  DeepWritable,
  StrictExtract,
  Dictionary,
  DictionaryValues,
  MarkOptional,
  MarkRequired,
  Merge,
  MergeN,
  NonEmptyObject,
  NonNever,
  noop,
  PickProperties,
  ReadonlyKeys,
  SafeDictionary,
  Tuple,
  WritableKeys,
  XOR,
  Head,
  Tail,
  Exact,
  ElementOf,
  DeepUndefinable,
  OptionalKeys,
  RequiredKeys,
  Opaque,
  AsyncOrSyncType,
  AsyncOrSync,
  Awaited,
  Newable,
  PickKeys,
  IsTuple,
} from "../lib";

function testDictionary() {
  const dict: Dictionary<number> = null as any;
  type Test = Assert<IsExact<typeof dict["foo"], number>>;
}

function testDictionaryTwoArguments() {
  const dict: Dictionary<number, "a" | "b"> = null as any;
  type Test = Assert<IsExact<typeof dict["a"], number>>;
}

function testDictionaryValues() {
  type Test = Assert<IsExact<DictionaryValues<Dictionary<number>>, number>>;
}

function testDictionaryValuesTwoArguments() {
  type Test = Assert<IsExact<DictionaryValues<Dictionary<number, "a" | "b">>, number>>;
}

function testSafeDictionary() {
  const dict: SafeDictionary<number> = null as any;
  type Test = Assert<IsExact<typeof dict["foo"], number | undefined>>;
}

function testSafeDictionaryByNumber() {
  const dict: SafeDictionary<boolean, number> = null as any;
  type Test = Assert<IsExact<typeof dict[42], boolean | undefined>>;
}

function testSafeDictionaryValues() {
  type Test = Assert<IsExact<DictionaryValues<SafeDictionary<number>>, number | undefined>>;
}

function testSafeDictionaryFiniteTypeNonExhaustiveness() {
  type TestType = "A" | "B";
  const safeDict: SafeDictionary<string, TestType> = { A: "OK" };
}

type ComplexNestedPartial = {
  simple?: number;
  nested?: {
    date?: Date;
    func?: () => string;
    array?: { bar?: number }[];
    set?: Set<{ name?: string }>;
    tuple?: [string?, number?, { good?: boolean }?];
    map?: Map<
      string,
      {
        name?: string;
      }
    >;
    promise?: Promise<{ foo?: string; bar?: number }>;
  };
};

type ComplexNestedRequired = {
  simple: number;
  nested: {
    date: Date;
    func: () => string;
    array: { bar: number }[];
    tuple: [string, number, { good: boolean }];
    set: Set<{ name: string }>;
    map: Map<
      string,
      {
        name: string;
      }
    >;
    promise: Promise<{ foo: string; bar: number }>;
  };
};

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

function testDeepPartial() {
  type cases = [
    Assert<IsExact<DeepPartial<number>, number>>,
    Assert<IsExact<DeepPartial<string>, string>>,
    Assert<IsExact<DeepPartial<boolean>, boolean>>,
    Assert<IsExact<DeepPartial<bigint>, bigint>>,
    Assert<IsExact<DeepPartial<symbol>, symbol>>,
    Assert<IsExact<DeepPartial<undefined>, undefined>>,
    Assert<IsExact<DeepPartial<null>, null>>,
    Assert<IsExact<DeepPartial<Function>, Function>>,
    Assert<IsExact<DeepPartial<Date>, Date>>,
    Assert<IsExact<DeepPartial<Error>, Error>>,
    Assert<IsExact<DeepPartial<RegExp>, RegExp>>,
    Assert<IsExact<DeepPartial<Map<string, boolean>>, Map<string, boolean>>>,
    Assert<IsExact<DeepPartial<Map<string, { a: number }>>, Map<string, { a?: number }>>>,
    Assert<IsExact<DeepPartial<ReadonlyMap<string, boolean>>, ReadonlyMap<string, boolean>>>,
    Assert<IsExact<DeepPartial<ReadonlyMap<string, { checked: boolean }>>, ReadonlyMap<string, { checked?: boolean }>>>,
    Assert<IsExact<DeepPartial<WeakMap<{ key: string }, boolean>>, WeakMap<{ key?: string }, boolean>>>,
    Assert<
      IsExact<DeepPartial<WeakMap<{ key: string }, { value: boolean }>>, WeakMap<{ key?: string }, { value?: boolean }>>
    >,
    Assert<IsExact<DeepPartial<Set<string>>, Set<string>>>,
    Assert<IsExact<DeepPartial<Set<number[]>>, Set<number[]>>>,
    Assert<IsExact<DeepPartial<ReadonlySet<string>>, ReadonlySet<string>>>,
    Assert<IsExact<DeepPartial<[]>, []>>,
    Assert<IsExact<DeepPartial<never[]>, undefined[]>>,
    Assert<IsExact<DeepPartial<[1, 2, 3]>, [(1 | undefined)?, (2 | undefined)?, (3 | undefined)?]>>,
    Assert<IsExact<DeepPartial<readonly number[]>, readonly (number | undefined)[]>>,
    Assert<IsExact<DeepPartial<Array<number>>, Array<number>>>,
    Assert<IsExact<DeepPartial<Promise<number>>, Promise<number>>>,
    Assert<
      IsExact<
        DeepPartial<Promise<{ api: () => { play: () => void; pause: () => void } }>>,
        Promise<{ api?: () => { play: () => void; pause: () => void } }>
      >
    >,
    Assert<IsExact<DeepPartial<{ a: 1; b: 2; c: 3 }>, { a?: 1; b?: 2; c?: 3 }>>,
    Assert<IsExact<DeepPartial<{ foo: () => void }>, { foo?: () => void }>>,
    Assert<IsExact<DeepPartial<ComplexNestedRequired>, ComplexNestedPartial>>,
  ];
}

function testDeepReadonly() {
  type cases = [
    Assert<IsExact<DeepReadonly<number>, number>>,
    Assert<IsExact<DeepReadonly<string>, string>>,
    Assert<IsExact<DeepReadonly<boolean>, boolean>>,
    Assert<IsExact<DeepReadonly<bigint>, bigint>>,
    Assert<IsExact<DeepReadonly<symbol>, symbol>>,
    Assert<IsExact<DeepReadonly<undefined>, undefined>>,
    Assert<IsExact<DeepReadonly<null>, null>>,
    Assert<IsExact<DeepReadonly<Function>, Function>>,
    Assert<IsExact<DeepReadonly<Date>, Date>>,
    Assert<IsExact<DeepReadonly<Error>, Error>>,
    Assert<IsExact<DeepReadonly<RegExp>, RegExp>>,
    Assert<IsExact<DeepReadonly<Map<string, boolean>>, ReadonlyMap<string, boolean>>>,
    Assert<IsExact<DeepReadonly<ReadonlyMap<string, boolean>>, ReadonlyMap<string, boolean>>>,
    Assert<IsExact<DeepReadonly<WeakMap<{ key: string }, boolean>>, WeakMap<{ key: string }, boolean>>>,
    Assert<
      IsExact<DeepReadonly<WeakMap<{ key: string }, { value: boolean }>>, WeakMap<{ key: string }, { value: boolean }>>
    >,
    Assert<IsExact<DeepReadonly<Set<string>>, ReadonlySet<string>>>,
    Assert<IsExact<DeepReadonly<ReadonlySet<string>>, ReadonlySet<string>>>,
    Assert<IsExact<DeepReadonly<[]>, readonly []>>,
    Assert<IsExact<DeepReadonly<[1, 2, 3]>, readonly [1, 2, 3]>>,
    Assert<IsExact<DeepReadonly<readonly number[]>, readonly number[]>>,
    Assert<IsExact<DeepReadonly<Array<number>>, ReadonlyArray<number>>>,
    Assert<IsExact<DeepReadonly<Promise<number>>, Promise<number>>>,
    Assert<IsExact<DeepReadonly<{ a: 1; b: 2; c: 3 }>, { a: 1; b: 2; c: 3 }>>,
    Assert<IsExact<DeepReadonly<{ foo: () => void }>, { foo: () => void }>>,
    Assert<IsExact<DeepReadonly<ComplexNestedRequired>, ComplexNestedReadonly>>,
  ];

  // Build-time test to ensure the fix for
  // https://github.com/krzkaczor/ts-essentials/issues/17 remains in place.
  {
    interface IDeepReadonlyTestHelperType extends DeepReadonly<{ field: string[] }> {}

    let a: DeepReadonly<IDeepReadonlyTestHelperType> = {
      field: ["lala"],
    };

    let b: IDeepReadonlyTestHelperType = {
      field: ["lala"],
    };

    b = a;
  }
}

function testDeepReadonlyWithUnknown() {
  interface MyInterface {
    myObject: unknown;
    myArray: unknown[];
  }
  const myObject: MyInterface = null!;
  let myReadonlyObject: DeepReadonly<MyInterface>;

  myReadonlyObject = myObject;
}

function testNonNullable() {
  type Test = Assert<IsExact<NonNullable<"abc" | null | undefined>, "abc">>;
}

function testDeepNullable() {
  type Test = Assert<IsExact<DeepNullable<ComplexNestedRequired>, ComplexNestedNullable>>;
}

type SimpleType = {
  field1: string;
  field2: string;
  field3: {
    field4: string;
    field5: number;
    field6: {
      field7: number;
      field8: string;
    };
  };
};

type SimpleTypeNullable = {
  field1: string | null;
  field2: string | null;
  field3: {
    field4: string | null;
    field5: number | null;
    field6: {
      field7: number | null;
      field8: string | null;
    };
  };
};

type SimpleTypeUndefinable = {
  field1: string | undefined;
  field2: string | undefined;
  field3: {
    field4: string | undefined;
    field5: number | undefined;
    field6: {
      field7: number | undefined;
      field8: string | undefined;
    };
  };
};

function testDeepNullable2() {
  type Test = Assert<IsExact<DeepNullable<SimpleType>, SimpleTypeNullable>>;
}

function testDeepUndefinable() {
  type Test1 = AssertFalse<IsExact<DeepUndefinable<SimpleType>, DeepPartial<SimpleType>>>;
  type Test2 = Assert<IsExact<DeepUndefinable<SimpleType>, SimpleTypeUndefinable>>;
  type Test3 = Assert<IsExact<DeepUndefinable<ComplexNestedRequired>, ComplexNestedUndefinable>>;
}

function testDeepNonNullable() {
  type cases = [
    Assert<IsExact<DeepNonNullable<number | null | undefined>, number>>,
    Assert<IsExact<DeepNonNullable<string | null | undefined>, string>>,
    Assert<IsExact<DeepNonNullable<boolean | null | undefined>, boolean>>,
    Assert<IsExact<DeepNonNullable<bigint | null | undefined>, bigint>>,
    Assert<IsExact<DeepNonNullable<symbol | null | undefined>, symbol>>,
    Assert<IsExact<DeepNonNullable<undefined | null | undefined>, never>>,
    Assert<IsExact<DeepNonNullable<null | null | undefined>, never>>,
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
    Assert<IsExact<DeepNonNullable<ComplexNestedNullableOrUndefined>, ComplexNestedRequired>>,
  ];
}

function testDeepRequire() {
  type Test = Assert<IsExact<DeepRequired<ComplexNestedPartial>, ComplexNestedRequired>>;
}

function testPickProperties() {
  type Test1 = Assert<IsExact<PickProperties<{ a: string; b: number[] }, any[]>, { b: number[] }>>;
  type Test2 = Assert<IsExact<PickProperties<{ a: string; b: number }, any[]>, {}>>;
}

function testOptionalKeys() {
  type Input = {
    req: string;
    opt?: string;
    opt2?: string;
    undef: string | undefined;
    nullable: string | null;
  };

  type Expected = "opt" | "opt2";
  type Actual = OptionalKeys<Input>;

  type Test = Assert<IsExact<Expected, Actual>>;
}

function testRequiredKeys() {
  type Input = {
    req: string;
    opt?: string;
    opt2?: string;
    undef: string | undefined;
    nullable: string | null;
  };

  type Expected = "req" | "undef" | "nullable";
  type Actual = RequiredKeys<Input>;

  type Test = Assert<IsExact<Expected, Actual>>;
}

function testPickKeys() {
  type Input = {
    req: number;
    opt?: string;
    opt2: string;
    undef: string | undefined;
    nullable: string | null;
  };

  type Expected1 = "opt2";
  type Actual1 = PickKeys<Input, string>;
  type Test1 = Assert<IsExact<Expected1, Actual1>>;

  type Expected2 = "opt" | "opt2" | "undef";
  type Actual2 = PickKeys<Input, string | undefined>;
  type Test2 = Assert<IsExact<Expected2, Actual2>>;
}

function testDeepOmit() {
  type Nested = {
    a: { b: string; c: { d: string; e: boolean }; f: number };
    array: { a: string; b: boolean }[][];
    set: Set<{ a: string; b: boolean }>;
    map: Map<
      number,
      {
        a: string;
        b: boolean;
      }
    >;
  };
  type Omitted = {
    a: { c: { e: boolean }; f: number };
    array: { b: boolean }[][];
    set: Set<{ b: boolean }>;
    map: Map<number, { b: boolean }>;
  };

  type Filter = {
    a: { b: never; c: { d: never } };
    array: { a: never };
    set: { a: never };
    map: { a: never };
  };

  type Test = Assert<IsExact<DeepOmit<Nested, Filter>, Omitted>>;
}

function testDeepOmit2() {
  type OptionalProperty = {
    id: string;
    age: number;
    name?: string;
  };
  type Omitted = {
    id: string;
    name?: string;
  };

  type Result = DeepOmit<OptionalProperty, { age: never }>;
  type Test = Assert<IsExact<Result, Omitted>>;
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

function testNonNever() {
  type TypesMap = { foo: string; bar: number; xyz: undefined };

  type Mapped = {
    [K in keyof TypesMap]: TypesMap[K] extends undefined ? never : TypesMap[K];
  };

  type TestA = Assert<IsExact<keyof Mapped, "foo" | "bar" | "xyz">>;
  type TestB = Assert<IsExact<keyof NonNever<Mapped>, "foo" | "bar">>;
}

function testNonEmptyObject() {
  type ObjectWithKeys = { foo: string; bar: number; xyz: undefined };
  type EmptyObject = {};

  type TestA = Assert<IsExact<NonEmptyObject<ObjectWithKeys>, ObjectWithKeys>>;
  type TestB = Assert<IsExact<NonEmptyObject<EmptyObject>, never>>;
}

function testDeepWritable() {
  type Test = Assert<IsExact<DeepWritable<ComplexNestedReadonly>, ComplexNestedRequired>>;
}

function testDeepWritable2() {
  type Foo = { readonly foo: string; bar: { readonly x: number } }[];

  const test: DeepWritable<Foo> = [
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

// Test whether for totally writable types, apply DeepReadonly then DeepWritable will yield the original type
function testDeepWritableReverseIsDeepReadonlyForTotallyWritableType() {
  type TotallyWritableType = {
    a: number[][];
    nested: { a: 1 };
    numberArray: number[];
  }[];

  type Test_Indeed_Obj_Totally_Writable = Assert<IsExact<TotallyWritableType, DeepWritable<TotallyWritableType>>>;
  type Test = Assert<IsExact<DeepWritable<DeepReadonly<TotallyWritableType>>, TotallyWritableType>>;
}

function testBuildable() {
  type Test = Assert<IsExact<Buildable<ComplexNestedReadonly>, ComplexNestedPartial>>;
}

function testMarkRequired() {
  type TestType = {
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };
  type ExpectedType = {
    required1: number;
    required2: string;
    optional1: null;
    optional2?: boolean;
  };

  type Test = Assert<IsExact<MarkRequired<TestType, "required2" | "optional1">, ExpectedType>>;
}

function testMarkOptional() {
  type TestType = {
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };
  type ExpectedType = {
    required1?: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };

  type Test = Assert<IsExact<MarkOptional<TestType, "required1">, ExpectedType>>;
}

function testMerge() {
  type cases = [
    Assert<IsExact<Merge<{}, { a: string }>, { a: string }>>,
    Assert<IsExact<Merge<{ a: string }, {}>, { a: string }>>,
    Assert<IsExact<Merge<{ a: number; b: string }, { a: string }>, { a: string; b: string }>>,
  ];
}

function testMergeN() {
  type cases = [
    Assert<IsExact<MergeN<[{ a: number; b: string; c: boolean }]>, { a: number; b: string; c: boolean }>>,
    Assert<
      IsExact<
        MergeN<[{ a: number; b: string; c: boolean }, { b: number; c: string; d: boolean }]>,
        { a: number; b: number; c: string; d: boolean }
      >
    >,
    Assert<IsExact<MergeN<[{ a: number }, { a: string }, { a: boolean }]>, { a: boolean }>>,
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
  const anything = (undefined as any) as TestType1;

  assert(anything);
  type Actual = typeof anything;
  type Test = Assert<IsExact<Actual, string>>;
}

function testXOR() {
  type TestType1 = { a: string };
  type TestType2 = { a: number; b: boolean };
  type TestType3 = { c: number; d: boolean };

  type Actual1 = XOR<TestType1, TestType2>;
  type Expected1 = { a: string; b?: never } | { a: number; b: boolean };

  type Actual2 = XOR<TestType1, TestType3>;
  type Expected2 = { a: string; c?: never; d?: never } | { a?: never; c: number; d: boolean };

  type Test1 = Assert<IsExact<Actual1, Expected1>>;
  type Test2 = Assert<IsExact<Actual2, Expected2>>;
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

function testOpaque() {
  type t1 = Assert<IsExact<Assignable<number, Opaque<number, "a">>, true>>;
  type t2 = Assert<IsExact<Assignable<Opaque<number, "a">, number>, false>>;
  type t3 = Assert<IsExact<Assignable<Opaque<number, "a">, Opaque<number, "b">>, false>>;
  type t4 = Assert<IsExact<Assignable<Opaque<number, "a">, Opaque<number, "a">>, true>>;
  type t5 = Assert<IsExact<Opaque<"a", string>, never>>; // should blow on mismatched order
}

function testAsyncOrSyncType() {
  type t1 = Assert<IsExact<AsyncOrSyncType<AsyncOrSync<number>>, number>>;
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
    Assert<IsExact<IsTuple<readonly number[]>, never>>,
    Assert<IsExact<IsTuple<{ length: 3 }>, never>>,
  ];
}

function testStrictExtract() {
  interface Dog {
    type: "dog";
    woof(): void;
  }

  interface Cat {
    type: "cat";
    meow(): void;
  }

  interface Mouse {
    type: "mouse";
    squeak(): void;
  }

  type Animal = Dog | Cat | Mouse;

  type cases = [
    Assert<IsExact<StrictExtract<Animal, { type: undefined }>, never>>,
    Assert<IsExact<StrictExtract<Animal, { type: never }>, never>>,
    Assert<IsExact<StrictExtract<Animal, { type: "dog" }>, Dog>>,
    Assert<IsExact<StrictExtract<Animal, { type: "cat" }>, Cat>>,
    Assert<IsExact<StrictExtract<Animal, { type: "mouse" }>, Mouse>>,
    Assert<IsExact<StrictExtract<Animal, { type: "cat" | "dog" }>, Cat | Dog>>,
    Assert<IsExact<StrictExtract<Animal, { type: "cat" | "dog" | "mouse" }>, Animal>>,
  ];
}
