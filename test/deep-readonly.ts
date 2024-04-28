import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepReadonly } from "../lib";
import { ComplexNestedReadonly, ComplexNestedRequired } from "./types";

function testDeepReadonly() {
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
    Assert<IsExact<DeepReadonly<number>, number>>,
    Assert<IsExact<DeepReadonly<string>, string>>,
    Assert<IsExact<DeepReadonly<boolean>, boolean>>,
    Assert<IsExact<DeepReadonly<bigint>, bigint>>,
    Assert<IsExact<DeepReadonly<symbol>, symbol>>,
    Assert<IsExact<DeepReadonly<undefined>, undefined>>,
    Assert<IsExact<DeepReadonly<null>, null>>,
    Assert<IsExact<DeepReadonly<Function>, Function>>,
    Assert<IsExact<DeepReadonly<ExtendedFunction>, ExtendedFunction>>,
    Assert<IsExact<DeepReadonly<Date>, Date>>,
    Assert<IsExact<DeepReadonly<ExtendedDate>, ExtendedDate>>,
    Assert<IsExact<DeepReadonly<Error>, Error>>,
    Assert<IsExact<DeepReadonly<ExtendedError>, Readonly<Error> & { readonly code: string }>>,
    Assert<IsExact<DeepReadonly<RegExp>, RegExp>>,
    Assert<IsExact<DeepReadonly<ExtendedRegExp>, ExtendedRegExp>>,
    Assert<IsExact<DeepReadonly<Map<string, boolean>>, ReadonlyMap<string, boolean>>>,
    Assert<IsExact<DeepReadonly<ReadonlyMap<string, boolean>>, ReadonlyMap<string, boolean>>>,
    Assert<IsExact<DeepReadonly<WeakMap<{ key: string }, boolean>>, WeakMap<{ key: string }, boolean>>>,
    Assert<
      IsExact<DeepReadonly<WeakMap<{ key: string }, { value: boolean }>>, WeakMap<{ key: string }, { value: boolean }>>
    >,
    Assert<IsExact<DeepReadonly<Set<string>>, ReadonlySet<string>>>,
    Assert<IsExact<DeepReadonly<Set<number[]>>, ReadonlySet<readonly number[]>>>,
    Assert<IsExact<DeepReadonly<Set<readonly number[]>>, ReadonlySet<readonly number[]>>>,
    Assert<IsExact<DeepReadonly<ReadonlySet<string>>, ReadonlySet<string>>>,
    Assert<IsExact<DeepReadonly<[]>, readonly []>>,
    Assert<IsExact<DeepReadonly<readonly []>, readonly []>>,
    Assert<IsExact<DeepReadonly<[1, 2, 3]>, readonly [1, 2, 3]>>,
    Assert<IsExact<DeepReadonly<readonly [1, 2, 3]>, readonly [1, 2, 3]>>,
    Assert<IsExact<DeepReadonly<number[]>, readonly number[]>>,
    Assert<IsExact<DeepReadonly<readonly number[]>, readonly number[]>>,
    Assert<IsExact<DeepReadonly<Array<number>>, ReadonlyArray<number>>>,
    Assert<IsExact<DeepReadonly<ReadonlyArray<number>>, ReadonlyArray<number>>>,
    Assert<IsExact<DeepReadonly<Promise<number>>, Promise<number>>>,
    Assert<IsExact<DeepReadonly<{ a: 1; b: 2; c: 3 }>, { a: 1; b: 2; c: 3 }>>,
    Assert<IsExact<DeepReadonly<{ foo: () => void }>, { foo: () => void }>>,
    Assert<
      IsExact<
        DeepReadonly<{ obj: unknown; arr: unknown[] }>,
        { readonly obj: unknown; readonly arr: readonly unknown[] }
      >
    >,
    Assert<IsExact<DeepReadonly<ComplexNestedRequired>, ComplexNestedReadonly>>,
  ];

  // Build-time test to ensure the fix for
  // https://github.com/ts-essentials/ts-essentials/pull/310
  // because IsExact<> is unable to text it.
  {
    type TestUnion = { value: string } | TestUnion[];
    type ReadonlyTestUnion = { readonly value: string } | readonly ReadonlyTestUnion[];

    const a: DeepReadonly<TestUnion> = [];
    const b: ReadonlyTestUnion = a;
  }

  // Build-time test to ensure the fix for
  // https://github.com/krzkaczor/ts-essentials/issues/17 remains in place.
  {
    interface TestObject extends DeepReadonly<{ field: string[] }> {}

    let a: DeepReadonly<TestObject> = {
      field: ["lala"],
    };

    let b: TestObject = {
      field: ["lala"],
    };

    b = a;
  }

  {
    interface TestObject {
      obj: unknown;
      arr: unknown[];
    }

    // @ts-expect-error
    const obj: TestObject = null;

    let readonlyObj: DeepReadonly<TestObject>;
    readonlyObj = obj;

    const readonlyObj2: DeepReadonly<TestObject> = obj;
  }
}
