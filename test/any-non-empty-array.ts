/**
 * This file contains a lot of unused functions as it's only typechecked.
 */
import { AssertTrue as Assert, IsExact, AssertFalse } from "conditional-type-checks";

import { AnyNonEmptyArray } from "../lib";

// T = U
type Assignable<T, U> = U extends T ? true : false;

function testAnyNonEmptyArray() {
  type Cases<T> = [
    Assert<IsExact<AnyNonEmptyArray<T>, [T, ...T[]]>>,
    AssertFalse<IsExact<AnyNonEmptyArray<T>, []>>,

    AssertFalse<Assignable<AnyNonEmptyArray<T>, []>>,
    Assert<Assignable<AnyNonEmptyArray<T>, [T]>>,
    Assert<Assignable<AnyNonEmptyArray<T>, [T, ...T[]]>>,
  ];
}
