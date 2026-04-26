import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Head } from "..";

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
