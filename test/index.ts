/**
 * This file contains a lot of unused functions as it's only typechecked.
 */
import { IsExactType as IsExact, AssertTrue as Assert } from "conditional-type-checks";
import {
  DeepNonNullable,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  Tuple,
  NonNever,
  Writable,
  DeepWritable,
  MarkRequired,
  Merge,
  ReadonlyKeys,
  WritableKeys,
} from "../lib";

function testDeepPartial() {
  type Params = {
    [key: string]: any;
  };

  type Input = {
    simple: number;
    nested: {
      date: Date;
      func: () => string;
    };
    params: Params;
  };

  type Expected = {
    simple?: number;
    nested?: {
      date?: Date;
      func?: () => string;
    };
    params?: {
      [key: string]: any;
    };
  };

  type Test = Assert<IsExact<DeepPartial<Input>, Expected>>;
}

function testDeepReadonly1() {
  type Input = {
    a: number[][];
    nested: {
      a: 1;
    };
    readonlyAlready: ReadonlyArray<number>;
    stringProperty: string;
    numberProperty: number;
    booleanProperty: boolean;
    unknownProperty: unknown;
    nullProperty: null;
    undefinedProperty: undefined;
  }[];

  type Expected = ReadonlyArray<{
    readonly a: ReadonlyArray<ReadonlyArray<number>>;
    readonly nested: {
      readonly a: 1;
    };
    readonly readonlyAlready: ReadonlyArray<number>;
    readonly stringProperty: string;
    readonly numberProperty: number;
    readonly booleanProperty: boolean;
    readonly unknownProperty: unknown;
    readonly nullProperty: null;
    readonly undefinedProperty: undefined;
  }>;

  type Test = Assert<IsExact<DeepReadonly<Input>, Expected>>;
}

interface IDeepReadonlyTestHelperType
  extends DeepReadonly<{
    field: string[];
  }> {}

// Build-time test to ensure the fix for
// https://github.com/krzkaczor/ts-essentials/issues/17 remains in place.
function testDeepReadonly2() {
  const a: DeepReadonly<IDeepReadonlyTestHelperType> = {
    field: ["lala"],
  };

  let b: IDeepReadonlyTestHelperType = {
    field: ["lala"],
  };

  b = a;
}

function testNonNullable() {
  type Test = Assert<IsExact<NonNullable<"abc" | null | undefined>, "abc">>;
}

function testDeepNonNullable() {
  type Nested = {
    date: Date | null | undefined;
    array: { bar: number | null | undefined }[] | null | undefined;
    tuple: [string | null | undefined, number | null | undefined, { good: boolean | null | undefined }];
    func: (() => string) | null | undefined;
  };

  type Input = {
    simple: number | null | undefined;
    nested: Nested | null | undefined;
  };

  type Expected = {
    simple: number;
    nested: {
      date: Date;
      array: { bar: number }[];
      tuple: [string, number, { good: boolean }];
      func: () => string;
    };
  };

  type Test = Assert<IsExact<DeepNonNullable<Input>, Expected>>;
}

function testDeepRequire() {
  type Input = {
    a?: number;
    nested?: {
      a?: 1;
    };
  }[];

  type Expected = {
    a: number;
    nested: {
      a: 1;
    };
  }[];

  type Test = Assert<IsExact<DeepRequired<Input>, Expected>>;
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
  type TypesMap = {
    foo: string;
    bar: number;
    xyz: undefined;
  };

  type Mapped = { [K in keyof TypesMap]: TypesMap[K] extends undefined ? never : TypesMap[K] };

  type TestA = Assert<IsExact<keyof Mapped, "foo" | "bar" | "xyz">>;
  type TestB = Assert<IsExact<keyof NonNever<Mapped>, "foo" | "bar">>;
}

function testDeepWritable() {
  type ReadonlyType = {
    readonly foo: string;
    bar: {
      readonly x: number;
    };
  };

  const test: DeepWritable<ReadonlyType> = {
    foo: "a",
    bar: {
      x: 5,
    },
  };

  test.foo = "b";
  test.bar.x = 2;
}

function testDeepWritable2() {
  type Foo = {
    readonly foo: string;
    bar: {
      readonly x: number;
    };
  }[];

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
    nested: {
      a: 1;
    };
    numberArray: number[];
  }[];

  type Test_Indeed_Obj_Totally_Writable = Assert<IsExact<TotallyWritableType, DeepWritable<TotallyWritableType>>>;
  type Test = Assert<IsExact<DeepWritable<DeepReadonly<TotallyWritableType>>, TotallyWritableType>>;
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

function testMerge() {
  {
    type T = {
      a: number;
      b: string;
    };

    type Merged = Merge<T, { a: string }>;

    type ExpectedMerged = {
      a: string;
      b: string;
    };

    type Test = Assert<IsExact<Merged, ExpectedMerged>>;
  }
}

function testReadonlyKeys() {
  type T = {
    readonly a: number;
    b: string;
  };

  type Actual = ReadonlyKeys<T>;

  type Expected = "a";

  type Test = Assert<IsExact<Actual, Expected>>;
}

function testWritableKeys() {
  type T = {
    readonly a: number;
    b: string;
  };

  type Actual = WritableKeys<T>;

  type Expected = "b";

  type Test = Assert<IsExact<Actual, Expected>>;
}
