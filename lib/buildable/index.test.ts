import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Buildable, DeepReadonly } from "..";
import { ComplexNestedRequired, ComplexNestedPartial, ComplexNestedReadonly } from "../test-types";

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
