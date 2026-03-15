import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Tail } from "..";

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
